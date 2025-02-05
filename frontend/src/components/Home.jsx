import React from "react";
import HeroSection from "../Home/HeroSection";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
import Creator from "../Home/Creator";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Trending />
      <Devotional />
      <Creator />
    </div>
  );
};

export default Home;
