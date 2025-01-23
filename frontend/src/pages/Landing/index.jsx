import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import Preloader from "../../components/Preloader";
import React, { useState, useEffect } from "react";

export const Landing = () => {

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fakeDataFetch = () =>{
        setTimeout(()=>{
          setLoading(false);
        },5500)
    }
    fakeDataFetch();
  }, [])

  return isLoading? (
    <Preloader />
  )
  :(
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
