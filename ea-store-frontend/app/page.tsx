import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"

async function getProducts() {
  const res = await fetch("http://localhost:5001/api/products", {
    cache: "no-store"
  })

  return res.json()
}

export default async function HomePage() {

  const products = await getProducts()

  return (
    <div>

      <Navbar></Navbar>

      {/* Hero Section */}
      <section className="bg-gray-300 py-20 text-center">
        <h1 className="text-4xl font-bold text-green-700">
          Professional Forex Expert Advisors
        </h1>

        <p className="text-gray-600 mt-4">
          Buy high-performance trading bots for MT4 & MT5
        </p>
      </section>

      {/* Product Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">

        <h2 className="text-2xl font-bold mb-8">
          Featured EAs
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </section>

    </div>
  )
}