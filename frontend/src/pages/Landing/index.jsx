import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import Preloader from "../../components/Preloader";
import React, { useState, useEffect } from "react";

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
