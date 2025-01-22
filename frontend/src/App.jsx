import axios from "axios";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout } from "./pages/HomeLayout";
import { Landing } from "./pages/Landing";
import { SustainabilityScore } from "./pages/SustainabilityScore";

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
    ],
  },
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
