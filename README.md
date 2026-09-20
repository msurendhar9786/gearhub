# GearHub — MERN Gaming Gear Ecommerce Store

A simple, complete MERN stack e-commerce site for **laptops, gaming headphones, mice, and keyboards**.

- **M**ongoDB — database (via Mongoose)
- **E**xpress — backend REST API
- **R**eact — frontend
- **N**ode.js — backend runtime

## Features
- Browse products by category (laptop / headphone / mouse / keyboard) + search
- Product detail pages
- User registration & login (JWT auth, passwords hashed with bcrypt)
- Shopping cart (persisted in browser localStorage)
- Checkout → creates a real Order in the database and reduces product stock
- "My Orders" page for logged-in users
- Simple Admin panel (add / edit / delete products) for admin users
- Seed script with 8 sample products + an admin account

## Folder structure
```
mern-ecommerce/
  backend/     Express + MongoDB API
  frontend/    React app
```

## 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally, OR a free MongoDB Atlas cluster (get a connection string)

## 2. Backend setup
```bash
cd backend
npm run dev

npm install
cp .env.example .env
```
Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.acj02gn.mongodb.net/mern_ecommerce?retryWrites=true&w=majority
JWT_SECRET=some_long_random_string
```
Replace `<db_username>` and `<db_password>` with a MongoDB Atlas database user, and allow your IP address in the Atlas network access settings.
Seed the database with sample products + an admin user:
```bash
npm run seed
```
This creates admin login: `admin@example.com` / `admin123`

Start the backend:
```bash
npm run dev
```
API runs at `http://localhost:5000`

## 3. Frontend setup
Open a new terminal:
```bash
cd frontend
npm start


npm install
```
App runs at `http://localhost:3000` and talks to the backend at `http://localhost:5000/api`
(change this via `REACT_APP_API_URL` if needed, e.g. in a `.env` file in `frontend/`).

## 4. Try it out
1. Register a normal account, or log in as admin (`admin@example.com` / `admin123`)
2. Browse products, add to cart, checkout (creates an order + reduces stock)
3. As admin, visit **/admin** to add/edit/delete products

## API summary
| Method | Route                 | Auth        | Description                  |
|--------|------------------------|-------------|-------------------------------|
| POST   | /api/auth/register     | -           | Create account                |
| POST   | /api/auth/login        | -           | Login, returns JWT            |
| GET    | /api/auth/me           | user        | Current user info             |
| GET    | /api/products          | -           | List products (?category, ?search) |
| GET    | /api/products/:id      | -           | Single product                |
| POST   | /api/products          | admin       | Create product                |
| PUT    | /api/products/:id      | admin       | Update product                |
| DELETE | /api/products/:id      | admin       | Delete product                |
| POST   | /api/orders             | user        | Place an order from cart      |
| GET    | /api/orders/my          | user        | My orders                     |
| GET    | /api/orders/:id         | user/admin  | Single order                  |

## Notes / next steps for production
- Add real payment integration (Stripe/Razorpay) — this build uses a simple "place order" flow, no payment gateway
- Add image uploads instead of URL strings
- Add pagination for the product list
- Add input validation library (e.g. Joi/Zod) on the backend
- Deploy: backend to Render/Railway, frontend to Vercel/Netlify, DB to MongoDB Atlas
