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
        <div className="hero-content my-auto w-[60%] ml-5 text-black">
          <h3 className="text-7xl font-bold">Protecting nature for a Sustainable Future</h3>
          <div className="backdrop-blur-sm  bg-white/20 rounded-2xl p-2 my-4">
            <p className="my-4 tracking-wider text-xl font-semibold text-black ">
              Discover eco-conscious products crafted for sustainability and everyday functionality. From zero-waste
              essentials to ethical goods, each item supports a greener lifestyle. Shop sustainably and make every
              purchase matter.
            </p>
          </div>
          <button className="hero-cta bg-black text-white px-5 py-2 rounded-full shadow-lg">See more</button>
        </div>
      </div>
    </>
  );
};
