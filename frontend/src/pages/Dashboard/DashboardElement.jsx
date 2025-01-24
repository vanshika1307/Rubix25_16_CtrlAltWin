import lock from "../../assets/images/lock.png";
import { Graph } from "./Graph";
import Styled from "styled-components";

import goldMedal from "../../assets/images/medals/gold.avif";
import silverMedal from "../../assets/images/medals/silver.jpg";
import bronzeMedal from "../../assets/images/medals/bronze.jpg";
import pfp from "../../assets/images/pfp.png";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

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

export const DashboardElement = ({ user }) => {
  useGSAP(() => {
    gsap.from(".name, .email", {
      y: 50,
      opacity: 0,
    });
    gsap.from(".pfp", {
      x: -50,
      opacity: 0,
    });

    gsap.from(".badge-container", {
      y: -100,
      opacity: 0,
      stagger: 0.1,
    });
  });

  const userScore = user?.scores?.length ? user?.scores[user.scores?.length - 1]?.score : 0;

  return (
    <Wrapper id="dashboard-bg" className="min-h-screen pt-[8rem] pb-8">
      <div className="user-info flex items-center gap-5 bg-white/50 backdrop-blur-md max-w-[600px] mx-auto p-5 rounded-md shadow-lg">
        <div className="pfp">
          <img src={pfp} alt="" className="h-16" />
        </div>
        <div className="details">
          <div className="name capitalize">
            <span>Name : </span> {user?.name}
          </div>
          <div className="email">
            <span>Email : </span> {user?.email}
          </div>
        </div>
        <div className="score mx-auto font-style font-bold bg-green-400 p-3 rounded-full border-2 border-green-800">
          {userScore}
        </div>
      </div>
      <div className="badges flex items-center justify-between gap-5 bg-white/50 backdrop-blur-md max-w-[600px] mx-auto p-5 my-5 rounded-md shadow-lg">
        {badges.map(({ url, unlockScore }, idx) => {
          console.log(userScore);
          return (
            <div
              key={idx}
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
      <div className="graph flex items-center gap-5 bg-white/80 backdrop-blur-md max-w-[600px] mx-auto p-5 rounded-md shadow-lg">
        <Graph data={user?.scores} />
      </div>
    </Wrapper>
  );
};
