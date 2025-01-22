import introImg from "../../assets/images/intro-img.png";

export const Intro = () => {
  return (
    <div className="grid grid-cols-2 p-5">
      <div className="my-auto">
        <h2 className="text-4xl">Hello :)</h2>
        <p className="my-3 text-lg leading-5">
          Our mission is rooted in sustainability and conscious living. Small, thoughtful choices can create big changes
          for the planet. Our collection focuses on ethical sourcing, responsible production, and environmental care.
          Whether reducing waste or supporting ethical brands, we're here to help you live a more sustainable lifestyle.
          Let's create a better future, one product at a time.
        </p>
        <p className="my-3 text-lg leading-5">
          Every product is designed with people and the planet in mind. From biodegradable materials to fair-trade
          craftsmanship, our products are both practical and sustainable. By choosing eco-friendly options, you're
          supporting a movement towards a healthier world. Together, we can make a real impact.
        </p>
      </div>
      <img src={introImg} alt="" className="" />
    </div>
  );
};
