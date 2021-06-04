import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './AnimatedClouds.css';

export default function AnimatedClouds() {
  const cloudsFirstLayer = React.createRef();
  const cloudsSecondLayer = React.createRef();
  const overlay = React.createRef();

  useEffect(() => {
    gsap.to(cloudsFirstLayer.current, { x: '-100%', delay: 1, duration: 1 });
    gsap.to(cloudsSecondLayer.current, { x: '100%', delay: 1, duration: 1 });
    gsap.to(overlay.current, { y: '-100%', delay: 2 });
  });

  return (
    <div className="overlay" ref={overlay}>
      <div className="layer layer-1" ref={cloudsFirstLayer} />
      <div className="layer layer-2" ref={cloudsSecondLayer} />
    </div>
  );
}
