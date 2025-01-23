import axios from "axios";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout } from "./pages/HomeLayout";
import { Landing } from "./pages/Landing";
import LocalStores from "./pages/LocalStores/LocalStores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
  {
    path: "map",
    element: <LocalStores /> 
  }
]);

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fn = async () => {
      const { data } = await axios.get("http://localhost:3000");
      console.log(data);
    };
    fn();
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
