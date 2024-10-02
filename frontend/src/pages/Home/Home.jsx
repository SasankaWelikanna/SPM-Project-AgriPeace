import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import Gallery from "./Gallery/Gallery";
import CostCalculatorSection from "./Cost Calculator/CostCalculatorSection";
import Scroll from "../../hooks/useScroll";

const Home = () => {
  return (
    <section>
      <Scroll />
      <HeroContainer />

      <div
        className="max-w-screen-xl mx-auto"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <CostCalculatorSection />
      </div>

      <div className="max-w-screen-xl mx-auto">
        <Gallery />
      </div>
    </section>
  );
};

export default Home;
