export default function Navbar() {
    return (
      <nav className="bg-black text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <h1 className="text-xl font-bold">EA Marketplace</h1>
  
          <div className="space-x-4">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            <a href="/products" className="hover:text-gray-300">Products</a>
            <a href="/dashboard/orders" className="hover:text-gray-300">Orders</a>
          </div>
        </div>
      </nav>
    );
  }