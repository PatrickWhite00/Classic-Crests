import { admin, method, safeError } from './_lib.js';

export default async function handler(req, res) {
  if (!method(req, res, 'GET')) return;
  try {
    const result = await admin().from('products')
      .select('id,team,name,year,price_pence,sizes,badge,color')
      .eq('active', true).order('id');
    if (result.error) throw result.error;
    res.setHeader('Cache-Control', 'public, s-maxage=60');
    return res.status(200).json({ products: result.data });
  } catch (error) {
    return safeError(res, error);
  }
}
