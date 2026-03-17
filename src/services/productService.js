import prisma from "../lib/prisma.js";

// Get all active products from the database
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

// Get a single product from the database using its slug
export const getProductBySlug = async (slug) => {
  return await prisma.product.findUnique({
    where: { slug },
  });
};
