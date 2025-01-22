import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Hero = () => {
  useGSAP(() => {
    gsap.from(".hero-content *", {
      x: -300,
      opacity: 0,
      stagger: 0.2,
    });
  });

  return (
    <>
      <div id="hero-bg" className="h-screen flex flex-col px-5">
        <div className="hero-content my-auto w-[60%] ml-5 text-gray-600">
          <h3 className="text-7xl font-bold">Protecting nature for a Sustainable Future</h3>
          <p className="my-4 tracking-wider font-semibold text-gray-900">
            Explore our handpicked collection of sustainable products that blend eco-conscious design with everyday
            functionality. From zero-waste essentials to ethically made goods, each item is carefully selected to help
            you live a more sustainable lifestyle. Join us in reducing your environmental footprint while enjoying
            high-quality, eco-friendly alternatives that align with your values. Make a positive impact with every
            purchase!
          </p>
          <button className="hero-cta bg-black text-white px-5 py-2 rounded-full shadow-lg">See more</button>
        </div>
      </div>
    </>
  );
};
