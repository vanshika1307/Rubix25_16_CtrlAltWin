import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Intro } from "./Intro";

export const Landing = () => {
  return (
    <>
      <main className="">
        <Hero />
        <Intro />
        <Features />
        <Footer />
      </main>
    </>
  );
};
