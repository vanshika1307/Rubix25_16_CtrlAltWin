import axios from "axios";
import { useEffect, useState } from "react";
import { backendURL } from "../../../URL";
import { useAuthContext } from "../../contexts/authContext";

import { DashboardElement } from "./DashboardElement";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { token } = useAuthContext();
  if (!token) {
    return <Navigate to={"/auth"} />;
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data.user);
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <>
        <div className="loading mx-auto my-[15rem]"></div>
      </>
    );
  }

  return (
    <>
      <DashboardElement user={user} />
    </>
  );
};
