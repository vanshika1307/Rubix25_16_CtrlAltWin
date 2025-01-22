import { LuScanBarcode } from "react-icons/lu";
import { RiExchangeFundsLine } from "react-icons/ri";
import { FaAward } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Features = () => {
  const data = [
    {
      name: "Know what you buy",
      description:
        "Get the lowdown on every product—its impact, sustainability score, and key facts, so you can make an informed choice with confidence.",
      icon: <LuScanBarcode />,
      url: "/",
    },
    {
      name: "Greener Alternatives",
      description:
        "Not quite right? No problem! Discover eco-friendly alternatives that match your needs without compromising on quality.",
      icon: <RiExchangeFundsLine />,
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
    <div id="features-bg" className="h-screen flex flex-col justify-center">
      <h2 className="font-bold text-4xl text-center mb-10">First steps at protecting mother nature...</h2>
      <div className="feature-cards flex gap-8 px-6">
        {data.map(({ name, description, icon, url }, idx) => {
          return (
            <div className="bg-white px-5 py-10 flex flex-col gap-3 justify-center items-center shadow-lg" key={idx}>
              <div className="feature-icon text-4xl">{icon}</div>
              <div className="feature-name font-bold text-xl">{name}</div>
              <div className="feature-desc text-gray-500 font-semibold tracking-wider">{description}</div>
              <Link
                to={url}
                className="bg-green-400 px-5 py-1 font-bold text-white mt-3 rounded-md inline-flex items-center gap-2 shadow-md"
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
