import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Scanner = () => {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');

  // Handle file drop
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setProductImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', productImage);
      formData.append('name', productName);

      // TODO: Add Gemini API integration here
      
      // Reset form
      setProductImage(null);
      setProductName('');
      setPreview('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Product Scanner
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Box */}
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-xl p-8
                transition-all duration-300 ease-in-out
                ${isDragActive 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 hover:border-green-400'}
                cursor-pointer
                text-center
              `}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white">Click or drag to replace</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-5xl text-gray-300">📸</div>
                  <p className="text-gray-500">
                    Drag and drop an image here, or click to select
                  </p>
                </div>
              )}
            </div>

            {/* Product Name Input */}
            <div className="space-y-2">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Product Name (optional)
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter product name"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!productImage && !productName.trim()}
              className={`
                w-full py-3 rounded-lg text-white font-medium
                transition-all duration-300
                ${(!productImage && !productName.trim())
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-500 hover:shadow-lg active:transform active:scale-95'}
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Scan Product'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Scanner;