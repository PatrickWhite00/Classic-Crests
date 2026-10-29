import {createClient} from '@supabase/supabase-js';
import Stripe from 'stripe';
export function admin(){return createClient(required('SUPABASE_URL'),required('SUPABASE_SERVICE_ROLE_KEY'),{auth:{autoRefreshToken:false,persistSession:false}})}
export function stripe(){return new Stripe(required('STRIPE_SECRET_KEY'))}
export function required(key){const value=process.env[key];if(!value)throw new Error('Missing server configuration: '+key);return value}
export function method(req,res,verb){if(req.method!==verb){res.setHeader('Allow',verb);res.status(405).json({error:'Method not allowed'});return false}return true}
export async function userFromRequest(req){const match=/^Bearer (.+)$/.exec(req.headers.authorization||'');if(!match)return null;const {data,error}=await admin().auth.getUser(match[1]);return error?null:data.user}
export function safeError(res,error){console.error(error);return res.status(500).json({error:'Request could not be completed'})}
