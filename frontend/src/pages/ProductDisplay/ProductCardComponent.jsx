import React, { useState, useEffect } from 'react';

const FALLBACK_IMAGE = 'https://placehold.co/600x400/png';

const ProductCardComponent = ({ product, isPriority }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Clean the image URL when component mounts
    if (product.image) {
      const cleanUrl = product.image
        .replace('/W/IMAGERENDERING_521856-T1', '')
        .replace('/_AC_UL320_', '');
      setImageUrl(cleanUrl);
    }
  }, [product.image]);

  const handleImageError = () => {
    console.log('Image failed to load:', imageUrl);
    setImageError(true);
    setImageUrl(FALLBACK_IMAGE);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', imageUrl);
    setIsLoading(false);
  };

  const handleViewDetails = () => {
    // Open Amazon link in a new tab
    if (product.link) {
      window.open(product.link, '_blank', 'noopener,noreferrer');
    }
  };

  // Determine additional classes based on priority
  const priorityClass = isPriority ? 'order-first' : 'order-last';

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${priorityClass} transform transition-transform duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="relative h-64 overflow-hidden">
        {isLoading && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        <img 
          src={imageUrl || FALLBACK_IMAGE}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {product.ratings && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
            ★ {product.ratings}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name || 'Product Name'}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-green-600 font-bold">
              {product.actual_price ? `₹${product.actual_price}` : 'Price not available'}
            </p>
            {product.discount_price && (
              <p className="text-sm text-gray-500 line-through">
                ₹{product.discount_price}
              </p>
            )}
          </div>
          {product.no_of_ratings && (
            <span className="text-sm text-gray-600">
              {product.no_of_ratings} reviews
            </span>
          )}
        </div>
        <div className="mt-3">
          <button 
            onClick={handleViewDetails}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardComponent;