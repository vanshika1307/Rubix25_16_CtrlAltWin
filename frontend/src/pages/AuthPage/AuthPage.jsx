import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaUserPlus, FaKey, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { backendURL } from "../../../URL";
import { useAuthContext } from "../../contexts/authContext";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set initial form state based on URL parameter
  useEffect(() => {
    const mode = searchParams.get("mode");
    setIsLogin(mode !== "signup");
  }, [searchParams]);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/src/assets/pattern-light.svg')] opacity-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-green-200 to-green-300 rounded-full filter blur-3xl opacity-20 transform translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-b from-green-200 to-green-300 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex items-center overflow-hidden">
        {/* Error Message */}
        {error && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md z-50">
            {error}
          </div>
        )}

        {/* Left Panel - Login */}
        <div
          className={`w-1/2 transition-transform duration-700 ease-in-out absolute 
          ${isLogin ? "translate-x-0" : "-translate-x-full"}`}
        >
          <LoginForm setError={setError} navigate={navigate} />
        </div>

        {/* Right Panel - Signup */}
        <div
          className={`w-1/2 transition-transform duration-700 ease-in-out absolute right-0
          ${!isLogin ? "translate-x-0" : "translate-x-full"}`}
        >
          <SignUpForm setError={setError} navigate={navigate} />
        </div>

        {/* Left Panel - Sign Up (hidden when logged in) */}
        <div
          className={`w-1/2 transition-transform duration-700 ease-in-out absolute 
          ${!isLogin ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="h-full flex flex-col items-center justify-center space-y-8 p-8 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="relative">
              <h2 className="text-3xl font-bold">Hello, Friend!</h2>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-green-400 rounded-full opacity-50 blur-lg"></div>
            </div>
            <p className="text-center text-green-50">Enter your personal details and start your journey with us</p>
            <button
              onClick={toggleAuth}
              className="px-8 py-3 rounded-full border-2 border-white text-white
                hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </div>

        {/* Right Panel - Login (hidden when signed up) */}
        <div
          className={`w-1/2 transition-transform duration-700 ease-in-out absolute right-0
          ${isLogin ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="h-full flex flex-col items-center justify-center space-y-8 p-8 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="relative">
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-green-400 rounded-full opacity-50 blur-lg"></div>
            </div>
            <p className="text-center text-green-50">To keep connected with us please login with your personal info</p>
            <button
              onClick={toggleAuth}
              className="px-8 py-3 rounded-full border-2 border-white text-white
                hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ setError, navigate }) => {
  const { token, setToken, name, setName } = useAuthContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify(formData),
      // });

      const { data } = await axios.post(`${backendURL}/auth/login`, formData);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setName(data?.user?.name);
      localStorage.setItem("username", data?.user?.name);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>
      <div className="space-y-4">
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg
          hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02]"
      >
        <FaSignInAlt className="inline-block mr-2" />
        Login
      </button>
    </form>
  );
};

const SignUpForm = ({ setError, navigate }) => {
  const { token, setToken, setName } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;

      // const response = await fetch("http://localhost:3000/api/v1/auth/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify(signupData),
      // });

      const { data } = await axios.post(`${backendURL}/auth/register`, formData);
      console.log("Registration response:", data);
      setToken(data.token);
      setName(data?.user?.name);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
      <div className="space-y-4">
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
        <div className="relative">
          <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg
          hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02]"
      >
        <FaUserPlus className="inline-block mr-2" />
        Sign Up
      </button>
    </form>
  );
};

export default AuthPage;
