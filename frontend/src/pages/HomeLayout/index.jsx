import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

export const HomeLayout = () => {
  return (
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
