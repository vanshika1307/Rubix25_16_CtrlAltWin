import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCardComponent from './ProductCardComponent';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:3000/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        // Sort products based on image quality
        const sortedProducts = data
          .filter(product => product.image)
          .sort((a, b) => {
            const isAValidImage = a.image && !a.image.includes('placehold.co');
            const isBValidImage = b.image && !b.image.includes('placehold.co');
            
            if (isAValidImage && !isBValidImage) return -1;
            if (!isAValidImage && isBValidImage) return 1;
            return 0;
          });

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Discover Eco-Friendly Products
          </h1>
          <p className="text-xl mb-8 text-green-100">
            Shop sustainably. Live responsibly.
          </p>
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search eco-friendly products..."
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg transition-all duration-300 hover:shadow-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-300"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={`${product.id || product.name}-${index}`}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <ProductCardComponent 
                product={product} 
                isPriority={!product.image?.includes('placehold.co')}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;