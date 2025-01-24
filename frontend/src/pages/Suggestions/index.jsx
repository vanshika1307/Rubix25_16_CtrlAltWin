import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import axios from "axios";
import { backendURL } from "../../../URL";
import { toast } from "react-toastify";
import { useState } from "react";

export const Suggestions = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  if (!token) {
    return <Navigate to={"/auth"} />;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendURL}/user/suggestions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuggestions(data.suggestions);
      console.log(data.suggestions);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="suggestions-bg" className="h-screen flex items-center">
        <div className="box bg-white/50 backdrop-blur-sm mx-auto max-w-[50rem] p-5 mt-16">
          <h3 className="font-semibold text-2xl font-serif text-green-800">
            Get personalized AI - based suggestions on how you can make make more sustainable choices to have a greater
            impact on the environment.
          </h3>

          <div className="flex items-center justify-center">
            <div className="relative inline-flex  group my-8 mx-5">
              <div className="absolute transitions-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <button
                href="#"
                title="Get AI Suggestions"
                className="outline-none active:border-none relative inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
                onClick={handleClick}
              >
                Get Suggestions
              </button>
            </div>
          </div>

          {loading ? (
            <>
              <div className="loading mx-auto"></div>
            </>
          ) : (
            <div className="suggestions custom-scrollbar max-h-[18rem] overflow-auto text-lg font-semibold">
              {suggestions.split("\n").map((para, index) => (
                <p key={index} className="mb-4">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
