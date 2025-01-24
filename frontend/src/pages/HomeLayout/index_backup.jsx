import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useEffect, useState } from "react";
import Preloader from "../../components/Preloader";

export const HomeLayout = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setLoading(false);
      }, 5500);
    };
    fakeDataFetch();
  }, []);

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <main className="">
        <Navbar />
        <div className="content-center">
          <Outlet />
        </div>
      </main>
    </>
  );
};
