import { LuScanBarcode } from "react-icons/lu";
import { RiExchangeFundsLine, RiMapPin2Line } from "react-icons/ri";
import { FaAward } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export const Features = () => {
  const ref = useRef(),
    btnRef = useRef();
  useGSAP(() => {
    gsap.from(".features-heading", {
      y: 50,
      delay: 0.3,
      opacity: 0,
      scrollTrigger: {
        trigger: ref.current,
        // markers: true,
        start: "top 80%",
      },
    });
    gsap.from("#card-1", {
      x: -200,
      y: 60,
      delay: 0.5,
      opacity: 0,
      scrollTrigger: {
        trigger: ref.current,
        // markers: true,
        start: "top 80%",
      },
    });
    gsap.from("#card-3", {
      x: 200,
      y: 60,
      opacity: 0,
      delay: 0.5,
      scrollTrigger: {
        trigger: ref.current,
        // markers: true,
        start: "top 80%",
      },
    });
    gsap.from("#card-2", {
      y: 80,
      opacity: 0,
      delay: 0.5,
      scrollTrigger: {
        trigger: ref.current,
        // markers: true,
        start: "top 80%",
      },
    });

    gsap.from(".feature-btn", {
      scale: 0,
      opacity: 0,
      y: 100,
      delay: 0.5,
      scrollTrigger: {
        trigger: btnRef.current,
        // markers: true,
        start: "top 80%",
      },
    });
  });

  const data = [
    {
      name: "Know what you buy",
      description:
        "Get the lowdown on every product—its impact, sustainability score, and key facts, so you can make an informed choice with confidence.",
      icon: <LuScanBarcode />,
      url: "/",
    },
    {
      name: "Sustainable Stores Near You",
      description:
        "Find eco-conscious stores in your area! Support sustainable businesses that align with your values and contribute to a greener future.",
      icon: <RiMapPin2Line />,
      url: "/",
    },
    {
      name: "Eco - Score",
      description:
        "Let us do the heavy lifting! Our browser extension scans your cart and rates each item based on sustainability, so you can shop smarter.",
      icon: <FaAward />,
      url: "/",
    },
  ];
  return (
    <div id="features-bg" className="h-screen flex flex-col items-center justify-center overflow-x-hidden">
      <h2 className="bg-white/30 backdrop:blur-sm p-4 space-x-1 rounded-2xl w-fit features-heading font-semibold text-5xl text-center mb-12 font-title" ref={ref}>
        First steps at protecting mother nature...
      </h2>
      <div className="feature-cards flex gap-8 px-6">
        {data.map(({ name, description, icon, url }, idx) => {
          return (
            <div
              className="bg-white px-5 py-10 flex flex-col gap-3 justify-center items-center shadow-lg rounded-2xl"
              key={idx}
              id={`card-${idx + 1}`}
            >
              <div className="feature-icon text-4xl">{icon}</div>
              <div className="feature-name font-bold text-xl">{name}</div>
              <div className="feature-desc text-gray-500 font-semibold tracking-wider" ref={btnRef}>
                {description}
              </div>
              <Link
                to={url}
                className="feature-btn bg-green-400 px-5 py-1 font-bold text-white mt-3 rounded-md inline-flex items-center gap-2 shadow-md"
              >
                Try it <FaLocationArrow />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
