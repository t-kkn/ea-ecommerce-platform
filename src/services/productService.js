import prisma from "../config/prisma.js";

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      type: true,
      description: true,
    },
  });
};

export const getProductBySlug = async (slug) => {
  return await prisma.product.findUnique({
    where: { slug },
  });
};