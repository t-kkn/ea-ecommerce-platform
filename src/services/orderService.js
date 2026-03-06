import prisma from "../config/prisma.js";

// Create a new order
export const createOrder = async (userId, productId) => {

  // Find product by ID
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // Create a new order in the database
  const order = await prisma.order.create({
    data: {
      userId,
      productId,
      amount: product.price,
      status: "PENDING"
    }
  });

  return order;
};

// Get all orders for a specific user
export const getOrderHistory = async (userId) => {

  // Query orders from the database
  const orders = await prisma.order.findMany({
    where: {
      userId: userId
    },
    include: {
      product: {
        select: {
          name: true,
          slug: true,
          price: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return orders;
};