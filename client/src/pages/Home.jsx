import React from "react";
import Hero from "../components/hero/Hero";
import Trending from "../components/trending/Trending";
import Features from "../components/features/Features";
import Team from "../components/team/Team";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Trending />
      <Features />
      <Team />
      <Footer />
    </div>
  );
};

export default Home;
