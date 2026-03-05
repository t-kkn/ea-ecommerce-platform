import prisma from "../config/prisma.js";

export const createOrder = async (userId, productId) => {

  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    throw new Error("Product not found");
  }

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

export const getOrderHistory = async (userId) => {

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