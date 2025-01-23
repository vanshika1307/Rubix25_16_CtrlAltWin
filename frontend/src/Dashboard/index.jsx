import axios from "axios";
import { useEffect, useState } from "react";
import { backendURL } from "../../URL";
import { useAuthContext } from "../contexts/authContext";
import Styled from "styled-components";

import pfp from "../assets/images/pfp.png";
import goldMedal from "../assets/images/medals/gold.avif";
import silverMedal from "../assets/images/medals/silver.jpg";
import bronzeMedal from "../assets/images/medals/bronze.jpg";
import lock from "../assets/images/lock.png";

const badges = [
  { url: bronzeMedal, unlockScore: 50 },
  { url: silverMedal, unlockScore: 75 },
  { url: goldMedal, unlockScore: 100 },
];

const Wrapper = Styled.div`
    .details {
      font-size : 1.2rem; 
    }
  .details span {
    font-weight : 800;
    letter-spacing : 2px;
  }

  .badge-container {
    border-radius : 50%;
  }
  .badge-container.locked::before{
    content :"";
    border-radius : 50%;
    display : block;
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    inset : 0;
    background-color : #3d3d3d94;
  }
`;

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { token } = useAuthContext();
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
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <>
      <Wrapper id="dashboard-bg" className="h-screen py-[8rem]">
        <div className="user-info flex items-center gap-5 bg-white/50 backdrop-blur-md max-w-[600px] mx-auto p-5 rounded-md shadow-lg">
          <div className="pfp">
            <img src={pfp} alt="" className="h-16" />
          </div>
          <div className="details">
            <div className="name capitalize">
              <span>Name : </span> {user.name}
            </div>
            <div className="email">
              <span>Email : </span> {user.email}
            </div>
          </div>
        </div>
        <div className="badges flex items-center gap-5 bg-white/50 backdrop-blur-md max-w-[600px] mx-auto p-5 my-5 rounded-md shadow-lg">
          {badges.map(({ url, unlockScore }) => {
            const userScore = user.scores.length ? user.scores[user.scores.length - 1].score : 0;
            console.log(userScore);
            return (
              <div
                className={`badge-container ${
                  userScore < unlockScore ? "locked" : ""
                } relative bg-green-500 p-[0.3rem] overflow-hidden`}
              >
                <img src={url} alt="" className={`h-[8rem] w-[8rem] rounded-full`} />
                <img
                  src={lock}
                  className={`${
                    userScore < unlockScore ? "" : "hidden"
                  } font-bold h-[2.5rem] text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] `}
                />
              </div>
            );
          })}
        </div>
        <div className="graph"></div>
      </Wrapper>
    </>
  );
};
