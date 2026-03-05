## EA E-commerce Platform (Backend API)

Simple e-commerce backend built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma**.

### What it includes

- **Products**: browse catalog + product details
- **Orders**: checkout + order history
- **Licenses**: verify license status

### Quick start

1) Install dependencies

```bash
npm install
```

2) Create `.env` in the project root

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=5001
```

3) Run DB migrations (creates tables + generates Prisma Client)

```bash
npx prisma migrate dev
```

4) Start the API (dev)

```bash
npm run dev
```

API runs on `http://localhost:5001` by default.

### Endpoints

- **GET** `/health`
- **GET** `/api/products`
- **GET** `/api/products/:slug`
- **POST** `/api/orders/checkout` (body: `{ "userId": "...", "productId": "..." }`)
- **GET** `/api/orders/history/:userId`
- **POST** `/api/verify-license` (body: `{ "licenseKey": "...", "mtAccount": "..." }`)

### Useful commands

- **Prisma Studio**: `npx prisma studio`

### Notes

- This is a learning/demo API; add authentication + password hashing before production use.
