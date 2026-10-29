# Classic Crests ⚽

A responsive **retro football shirt demo storefront** built with HTML, CSS and vanilla JavaScript.

## Features
- Responsive product catalogue with sample shirt listings
- Search and filter by team, size and maximum price
- Select a size and add shirts to a shopping bag
- Shopping bag persists locally using browser localStorage
- Accessible labels, keyboard-friendly controls and clear empty states

> **Demo only:** Prices and products are illustrative. There is no inventory verification, authentication, order processing, payment integration or checkout. Do not enter payment information. Shirt illustrations are placeholders, not licensed product photography.

## Run locally
1. Clone: `git clone https://github.com/PatrickWhite00/Classic-Crests.git`
2. Enter the folder: `cd Classic-Crests`
3. Open `index.html` in a modern browser, or serve the directory with `python -m http.server 8000` and visit `http://localhost:8000`.

No build step or dependencies are required.

## Structure
- `index.html` — semantic page markup
- `styles.css` — responsive styling
- `app.js` — sample catalogue, filtering and local bag

## Deployment (demo only)
Host the static files on GitHub Pages, Netlify or another static hosting provider. For GitHub Pages, merge the branch, then go to **Settings → Pages → Deploy from a branch → main / root**. Verify the published URL in GitHub Pages settings.

## Production roadmap
- Replace placeholders with licensed images and real inventory
- Add backend API, persistent database and secure authentication
- Build server-validated basket, shipping, tax and stock checks
- Integrate hosted payment checkout (e.g. Stripe Checkout) with verified webhooks
- Add order management, confirmation emails and returns policies
- Add automated tests, CI, accessibility audit and performance monitoring
- Configure domain, HTTPS, privacy/cookie policy and legal pages

Never store payment card data in localStorage or trust client-supplied prices. A live checkout requires merchant onboarding, credentials, and explicit approval before deployment.

## License
No license is currently specified. All rights reserved unless the repository owner adds one.
