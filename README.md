# EA E-commerce Platform

Full-stack demo project for selling Expert Advisors (EAs).

The project includes:
- a `Next.js` storefront in `frontend/`
- an `Express` API in `src/`
- a `PostgreSQL` database managed with `Prisma`

## Features

- Browse active products on the home page
- View product detail pages by slug
- Register and log in with JWT authentication
- Log in with Google or Facebook SSO
- Create orders for the logged-in user
- View order history in the dashboard
- View logged-in user profile
- Verify license keys through the API

## Tech Stack

- Frontend: `Next.js`, `React`, `TypeScript`, `Tailwind CSS`
- Backend: `Node.js`, `Express`, `Prisma`
- Database: `PostgreSQL`
- Auth: `JWT`

## Folder Structure

```text
frontend/   Next.js website
src/        Express backend API
prisma/     Prisma schema and migrations
```

## Requirements

- `Node.js` 18+
- `npm`
- `PostgreSQL`

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=5001
JWT_SECRET="your-secret-key"
FRONTEND_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:5001/api/auth/google/callback"
FACEBOOK_APP_ID="your-facebook-app-id"
FACEBOOK_APP_SECRET="your-facebook-app-secret"
FACEBOOK_CALLBACK_URL="http://localhost:5001/api/auth/facebook/callback"
```

## Local Setup

### 1. Install backend dependencies

From the project root:

```bash
npm install
```

### 2. Install frontend dependencies

From the frontend folder:

```bash
cd frontend
npm install
```

### 3. Run database migrations

From the project root:

```bash
npx prisma migrate dev
```

This creates the tables and generates the Prisma client.

## Run the App

Start the backend from the project root:

```bash
npm run dev
```

The backend runs at `http://localhost:5001`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at `http://localhost:3000`.

## Main Pages

- `/` Home page with product list
- `/products/[slug]` Product detail page
- `/login` Login page
- `/register` Register page
- `/checkout?productId=...` Checkout page
- `/dashboard/orders` Logged-in user's order history
- `/dashboard/profile` Logged-in user's profile

## API Endpoints

- `GET /health`
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `GET /api/auth/facebook`
- `GET /api/auth/facebook/callback`
- `GET /api/users/profile`
- `POST /api/orders/checkout`
- `GET /api/orders/history/:userId`
- `POST /api/verify-license`

Notes:
- `POST /api/orders/checkout` expects the user to be logged in and send a JWT token.
- `GET /api/users/profile` expects a valid JWT token.
- Google and Facebook login redirect back to the frontend login page with a JWT token.

## Sample Data

You can add sample products with Prisma Studio:

```bash
npx prisma studio
```

Example product fields:
- `name`
- `slug`
- `description`
- `price`
- `type`
- `isActive`

## Useful Commands

From the project root:

```bash
npx prisma studio
npx prisma migrate dev
```

From `frontend/`:

```bash
npm run lint
```

## Current Limitations

- Payment processing is not implemented
- Product images and richer metadata are still minimal
- Facebook login can require extra app setup and permissions before email access works reliably
- This project is intended for learning and iteration, not production use as-is
