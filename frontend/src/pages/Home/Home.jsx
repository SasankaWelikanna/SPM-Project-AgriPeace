import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import Gallery from "./Gallery/Gallery";
import CostCalculatorSection from "./Cost Calculator/CostCalculatorSection";
import Scroll from "../../hooks/useScroll";
import Bar from "./HomePageItems/Bar";
import Testimonials from "./HomePageItems/Testimonials";
import Bar1 from "./HomePageItems/Bar1";

const Home = () => {
  return (
    <section>
      <Scroll />
      <HeroContainer />

      <div
        className="max-w-screen-xl mx-auto"
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <CostCalculatorSection />
      </div>

      <div className="max-w-screen-xl mx-auto">
        <Gallery />
      </div>

      <div className="mx-auto" data-aos="zoom" data-aos-duration="1000">
        <Bar1 />
      </div>

      <div className="mx-auto" data-aos="fade-left" data-aos-duration="1500">
        <Bar />
      </div>

      <div className="mx-auto">
        <Testimonials />
      </div>
    </section>
  );
};

export default Home;
