import {admin,stripe,method,safeError,userFromRequest,required} from './_lib.js';
export default async function handler(req,res){if(!method(req,res,'POST'))return;try{
const user=await userFromRequest(req);if(!user)return res.status(401).json({error:'Sign in before checkout'});
const items=req.body?.items;if(!Array.isArray(items)||items.length<1||items.length>20)return res.status(400).json({error:'Invalid bag'});
const normalized=[];for(const item of items){if(!Number.isSafeInteger(item.id)||!Number.isInteger(item.qty)||item.qty<1||item.qty>10||typeof item.size!=='string'||!['S','M','L','XL'].includes(item.size))return res.status(400).json({error:'Invalid item'});normalized.push({id:item.id,qty:item.qty,size:item.size})}
const ids=[...new Set(normalized.map(x=>x.id))];const db=admin();const {data:products,error}=await db.from('products').select('id,team,name,price_pence,sizes,active').in('id',ids).eq('active',true);if(error)throw error;
if(products.length!==ids.length)return res.status(400).json({error:'Some items are unavailable'});
const map=new Map(products.map(p=>[p.id,p]));let total=0;const lines=normalized.map(item=>{const p=map.get(item.id);if(!p.sizes.includes(item.size)||!Number.isSafeInteger(p.price_pence)||p.price_pence<50)throw new Error('Invalid product configuration');total+=p.price_pence*item.qty;return {product_id:p.id,size:item.size,quantity:item.qty,unit_price_pence:p.price_pence,description:p.team+' '+p.name}});
if(total>1000000)return res.status(400).json({error:'Order exceeds maximum'});
const {data:order,error:orderError}=await db.from('orders').insert({user_id:user.id,status:'pending',total_pence:total,currency:'gbp'}).select('id').single();if(orderError)throw orderError;
const {error:lineError}=await db.from('order_items').insert(lines.map(({description,...line})=>({...line,order_id:order.id})));if(lineError)throw lineError;
const site=new URL(required('SITE_URL'));if(!['http:','https:'].includes(site.protocol))throw new Error('Invalid SITE_URL');
const session=await stripe().checkout.sessions.create({mode:'payment',client_reference_id:order.id,customer_email:user.email||undefined,metadata:{order_id:order.id,user_id:user.id},line_items:lines.map(l=>({price_data:{currency:'gbp',unit_amount:l.unit_price_pence,product_data:{name:l.description+' ('+l.size+')'}},quantity:l.quantity})),success_url:new URL('/?checkout=success',site).toString(),cancel_url:new URL('/?checkout=cancelled',site).toString()},{idempotencyKey:'order-'+order.id});
await db.from('orders').update({stripe_session_id:session.id}).eq('id',order.id);
return res.status(200).json({url:session.url})
}catch(e){return safeError(res,e)}}
