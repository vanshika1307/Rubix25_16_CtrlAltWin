import introImg from "../../assets/images/intro-img.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export const Intro = () => {
  const ref = useRef();
  useGSAP(() => {
    gsap.from(".intro-heading, .para-1, .para-2", {
      x: -200,
      opacity: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ref.current,
        scroller: "body",
        // markers: true,
        start: "top 80%",
      },
    });
    gsap.from(".intro-image", {
      x: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: ref.current,
        scroller: "body",
        // markers: true,
        start: "top 80%",
      },
    });
  });

  return (
    <div className="grid grid-cols-2  h-full p-5 overflow-x-hidden font-serif bg-green-100">
      <div className="my-auto ">
        <h2 className="intro-heading text-4xl font-bold">Our Mission </h2>
        <p className="para-1 my-3 text-lg leading-5 tracking-wide text-gray-800 " ref={ref}>
          Our mission is rooted in sustainability and conscious living. Small, thoughtful choices can create big changes
          for the planet. Our collection focuses on ethical sourcing, responsible production, and environmental care.
          Whether reducing waste or supporting ethical brands, we're here to help you live a more sustainable lifestyle.
          Let's create a better future, one product at a time.
        </p>
        <p className="para-2 my-3 text-lg leading-5 tracking-wide text-gray-800">
          Every product is designed with people and the planet in mind. From biodegradable materials to fair-trade
          craftsmanship, our products are both practical and sustainable. By choosing eco-friendly options, you're
          supporting a movement towards a healthier world. Together, we can make a real impact.
        </p>
      </div>
      <img className="intro-image w-[70%] ml-20" src={introImg} alt="" />
    </div>
  );
};
