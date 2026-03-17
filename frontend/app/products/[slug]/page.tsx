import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { apiFetch } from "@/lib/api"

// Function to get product data using the product slug
async function getProduct(slug: string) {
  const res = await fetch(`http://localhost:5001/api/products/${slug}`, {
    cache: "no-store", // always fetch fresh data (no caching)
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Navbar></Navbar>

      <div className="max-w-5xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600 mt-4">{product.description}</p>

          <p className="text-2xl font-semibold mt-6">${product.price}</p>

          <button>
            <a href={`/checkout?productId=${product.id}`}
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded">
              Buy Now
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
