import React from "react";
import { Hero } from "./components/hero";
import { Topic } from "./components/topic";
import { FAQ } from "./components/FAQ";

export const LandingPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Topic />
      <FAQ />
    </div>
  );
};
