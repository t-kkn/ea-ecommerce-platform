type Product = {
    id: string
    name: string
    slug: string
    description: string
    price: number
  }

  export default function ProductCard({ product }: { product: Product }) {
    return (
      <div className="border rounded-xl p-5 shadow hover:shadow-lg">
        <h2 className="text-lg font-bold">{product.name}</h2>
  
        <p className="text-gray-500 text-sm mt-2">
          {product.description}
        </p>
  
        <p className="text-xl font-semibold mt-4">
          ${product.price}
        </p>
  
        <a
          href={`/products/${product.slug}`}
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Details
        </a>
      </div>
    );
  }