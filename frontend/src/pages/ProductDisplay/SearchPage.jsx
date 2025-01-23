import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCardComponent from "./ProductCardComponent";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch all products upfront
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        filterProducts(data, query);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [query]);

  const filterProducts = (products, searchQuery) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.main_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sub_category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 mt-[4rem]">Search Results for "{query}"</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCardComponent key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
