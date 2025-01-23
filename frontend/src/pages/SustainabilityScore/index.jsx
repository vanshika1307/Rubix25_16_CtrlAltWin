import axios from "axios";
import { useState } from "react";
import { backendURL } from "../../../URL";
import { useAuthContext } from "../../contexts/authContext";
import { toast } from "react-toastify";

export const SustainabilityScore = () => {
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();

  const handleInputChange = (e) => {
    setProducts(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    if (products.trim() == "") {
      return window.alert("Please enter elements");
    }
    const productsArray = products.split(",");
    console.log(productsArray);
    try {
      const { data } = await axios.post(
        `${backendURL}/user`,
        { products: products.split(", ") },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { change } = data;
      if (!change) {
        toast.warning("Your purchase does not contain sustainable items :(");
      } else {
        toast.success(`You just gained ${change} points!!`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="hero-bg" className="h-screen flex justify-center items-center">
      <div className="bg-gray-50/60 backdrop-blur-sm p-8 max-w-lg mx-auto rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold tracking-wider text-center text-gray-800 mb-6">Products You Bought</h1>
        <div>
          <textarea
            value={products}
            onChange={handleInputChange}
            placeholder="Enter product names, separated by commas"
            rows={5}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
          />
          <p className="mt-2 text-sm text-gray-600">
            Enter product names separated by commas (e.g., Apple, Banana, Orange).
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out"
          disabled={loading}
        >
          {loading ? "Loading.." : "Submit"}
        </button>
      </div>
    </div>
  );
};
