# Production integration (not activated)

## Architecture
- Static storefront deployed to Vercel
- Vercel Node serverless endpoints in `api/`
- Supabase Auth (verified bearer token), Postgres (RLS), and service-role server client
- Stripe hosted Checkout, signed webhook, idempotent order status transition

## Configuration
1. Create a separate Supabase project. Run `supabase/schema.sql` in its SQL editor.
2. Create real products in the database. Only mark them `active=true` when approved and ready.
3. Create a Stripe account in **test mode** and configure webhook endpoint `https://<your-preview-host>/api/webhook` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
4. Set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SITE_URL` in Vercel project settings. Do not commit actual values. `SUPABASE_SERVICE_ROLE_KEY` and Stripe keys must NEVER be exposed to client JavaScript.
5. Use `npm install` and `npx vercel dev` for local API testing.
6. Enable desired Supabase Auth providers and configure allowed redirect URLs. Restrict deployment until approved.

## API contracts
- `GET /api/products`: public active catalogue
- `POST /api/checkout`: authenticated bearer token, body `{"items":[{"id":1,"size":"M","qty":1}]}`; returns Stripe hosted Checkout URL
- `POST /api/webhook`: Stripe-signed raw request; marks matching paid orders

## Important incomplete items
The existing UI is **still a demo** and does not call the production API or provide an auth screen. This PR prepares server integration only. Do not enable checkout until the UI is wired, integration-tested, and approved. Inventory reservation/stock decrement, shipping, taxes, refunds, privacy/terms, fulfilment, monitoring and automated tests must be completed before accepting live orders. Webhook currently records payment only and does not fulfil orders.

### Security
- Prices are retrieved from the database on the server, never trusted from the browser.
- Authentication tokens are validated against Supabase Auth.
- Orders are linked to the authenticated user.
- Webhook signature is verified and order status transition is idempotent.
- Production review should additionally enforce request body limits, rate limiting, fraud checks, strict origin policy, and observability.
