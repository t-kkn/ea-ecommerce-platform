ea-ecommerce-platform
======================

Simple e-commerce backend built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma**.

It currently supports:
- **Users** (Prisma `User` model)
- **Products**
- **Licenses**
- **Orders**

This README explains how to install dependencies, configure the database, run migrations, seed mock data, and start the API server.

---

## Prerequisites

- **Node.js** (LTS recommended)
- **npm** or **yarn**
- **PostgreSQL** running locally or in the cloud

You should have a Postgres database created (for example `ea_ecommerce`) and a connection URL ready.

---

## Environment setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd ea-ecommerce-platform
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure `.env`**

Create a `.env` file in the project root (if it does not exist) and set your database URL:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` accordingly.

---

## Prisma schema overview

The Prisma schema is defined in `prisma/schema.prisma`.

Key models:

- **`User`**
  - `id` (UUID, primary key)
  - `email` (unique)
  - `password`
  - `createdAt`
  - Relations: `licenses`, `orders`

- **`Product`**
  - `id`, `name`, `slug` (unique), `description`, `price`, `type`, `isActive`
  - Timestamps: `createdAt`, `updatedAt`
  - Relations: `licenses`, `orders`

- **`License`**
  - `id`, `licenseKey` (unique), `mtAccount`, `expiryDate`, `status`
  - Relations: `user`, `product`

- **`Order`**
  - `id`, `amount`, `status`, `createdAt`
  - Relations: `user`, `product`

---

## Database migrations

To apply the Prisma migrations to your Postgres database:

```bash
npx prisma migrate dev
```

This will:
- Create/update your database schema to match `prisma/schema.prisma`
- Generate the Prisma Client

You can also inspect the database using:

```bash
npx prisma studio
```

---

## Seeding mock data (including 2 users)

This project can use a Prisma seed script to insert basic mock data such as two beginner users.

Example `prisma/seed.js`:

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "beginner1@example.com",
        password: "password123", // for real apps, hash this
      },
      {
        email: "beginner2@example.com",
        password: "password123", // for real apps, hash this
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeded 2 mock users");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

In `package.json`, configure Prisma seeding:

```json
"prisma": {
  "seed": "node prisma/seed.js"
}
```

Then run:

```bash
npx prisma db seed
```

---

## Running the server

From the project root:

```bash
npm start
```

or, if you have a dev script:

```bash
npm run dev
```

By default, the Express server (see `src/server.js`) usually listens on a port such as `3000` (check the file for the exact value).

---

## API structure (high level)

The main pieces under `src/`:

- **`src/server.js`**: Express app setup and route registration.
- **`src/config/prisma.js`**: Prisma Client configuration.
- **`src/routes`**:
  - `productRoutes.js`
  - `orderRoutes.js`
  - `licenseRoutes.js`
- **`src/services`**:
  - `productService.js`
  - `orderService.js`

Routes handle HTTP requests and delegate business logic to the corresponding service files, which communicate with Prisma.

---

## Example usage

After starting the server, you can interact with the API using a tool like Postman or curl. For example:

- **List products**
  - `GET /products`

- **Create an order**
  - `POST /orders`
  - Body typically contains `userId`, `productId`, and `amount`.

Consult the route files in `src/routes` for the exact endpoints and payloads.

---

## Development notes

- Always run migrations after changing `prisma/schema.prisma`.
- Consider adding proper password hashing (e.g. using `bcrypt`) and authentication middleware before going to production.
- You can extend models and services to support more advanced e-commerce features (payments, inventory, etc.).
