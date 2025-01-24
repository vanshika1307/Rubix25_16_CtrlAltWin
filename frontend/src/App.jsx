import axios from "axios";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout } from "./pages/HomeLayout";
import { Landing } from "./pages/Landing";
import { SustainabilityScore } from "./pages/SustainabilityScore";
import AuthPage from "./pages/AuthPage/AuthPage";
import CommunityHub from "./pages/CommunityHub";
import { AuthContextProvider } from "./contexts/authContext";
import LocalStores from "./pages/LocalStores/LocalStores";
import { Dashboard } from "./pages/Dashboard";
import Scanner from "./pages/Scanner/scanner";
import ProductsPage from "./pages/ProductDisplay/Home";
import SearchPage from "./pages/ProductDisplay/SearchPage";
import { Suggestions } from "./pages/Suggestions";
import AboutUs from "./pages/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/score",
        element: <SustainabilityScore />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/community",
        element: <CommunityHub />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/scanner",
        element: <Scanner />,
      },

      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/map",
        element: <LocalStores />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/suggestions",
        element: <Suggestions />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000");
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };
    fn();
  }, []);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
