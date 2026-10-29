import {admin,stripe,required,safeError,method} from './_lib.js';
export const config={api:{bodyParser:false}};
async function raw(req){const chunks=[];for await(const c of req)chunks.push(Buffer.isBuffer(c)?c:Buffer.from(c));return Buffer.concat(chunks)}
export default async function handler(req,res){if(!method(req,res,'POST'))return;let event;try{event=stripe().webhooks.constructEvent(await raw(req),req.headers['stripe-signature'],required('STRIPE_WEBHOOK_SECRET'))}catch(e){return res.status(400).json({error:'Invalid webhook signature'})}
try{if(event.type==='checkout.session.completed'||event.type==='checkout.session.async_payment_succeeded'){const session=event.data.object;if(session.payment_status==='paid'&&session.mode==='payment'&&session.metadata?.order_id){const {error}=await admin().rpc('mark_order_paid',{p_order_id:session.metadata.order_id,p_session_id:session.id,p_payment_intent:typeof session.payment_intent==='string'?session.payment_intent:null});if(error)throw error}}
return res.status(200).json({received:true})}catch(e){return safeError(res,e)}}
