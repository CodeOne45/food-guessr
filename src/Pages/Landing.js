import About from 'Components/About/About';
import CTA from 'Components/CTA/CTA';
import Footer from 'Components/Footer/Footer';
import Hero from 'Components/Hero/Hero';
import LogoClouds from 'Components/LogoClouds/LogoClouds';
import Team from 'Components/Team/Team';
import React from 'react';

export default function Landing() {
  return (
    <div id="landing">
      <Hero />
      <About />
      <LogoClouds />
      <CTA />
      <Team />
      <Footer />
    </div>
  );
}
