import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Scanner = () => {
  const [productImage, setProductImage] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setProductImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productImage) {
      alert("Please upload an image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", productImage);

      const response = await fetch("http://localhost:3000/api/scanner", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the barcode");
      }

      const data = await response.json();
      setProductDetails(data.details);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the barcode.");
    } finally {
      setLoading(false);
      setPreview("");
      setProductImage(null);
    }
  };

  return (
    <div id="scanner-bg" className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 ">
      <div className="max-w-3xl mx-auto my-[8rem]">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">Product Scanner</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Box */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"
              } cursor-pointer text-center`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <div className="relative group">
                  <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white">Click or drag to replace</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-5xl text-gray-300">📸</div>
                  <p className="text-gray-500">Drag and drop an image here, or click to select</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!productImage}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                !productImage
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500 hover:shadow-lg active:transform active:scale-95"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Scan Product"
              )}
            </button>
          </form>

          {/* Display Product Details */}
          {productDetails && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-bold">Product Details</h2>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{productDetails}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
