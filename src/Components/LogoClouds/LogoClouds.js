import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import htmlCssLogo from 'Assets/img/htmlCss.svg';
import nodeJsLogo from 'Assets/img/nodeJs.svg';
import reactLogo from 'Assets/img/react.svg';
import tailwindLogo from 'Assets/img/tailwind.svg';
import Logo from 'Components/UI/Logo/Logo';

const logos = [
  { src: reactLogo, alt: 'React', href: 'https://fr.reactjs.org/' },
  { src: nodeJsLogo, alt: 'nodeJS', href: 'https://nodejs.org/fr/' },
  { src: htmlCssLogo, alt: 'htmlCss', href: '/' },
  { src: tailwindLogo, alt: 'TailwindCss', href: 'https://tailwindcss.com/' },
];

export default function LogoClouds() {
  const logoCloudsTween = useRef();
  const logosIcon = React.createRef();
  const logoCloudsText = React.createRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    logoCloudsTween.current = gsap.timeline({
      scrollTrigger: {
        trigger: '#logo-clouds',
        start: 'top bottom',
        end: 'top top',
        toggleActions: 'play none none reset',
      },
    });

    logoCloudsTween.current
      .from(logoCloudsText.current, {
        x: '-100%',
        opacity: 0,
        ease: 'back.out(1.7)',
      })
      .from(
        logosIcon.current,
        {
          x: '100%',
          opacity: 0,
          ease: 'back.out(1.7)',
        },
        '>'
      );
  });

  return (
    <section id="logo-clouds" className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div ref={logoCloudsText}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Fabriqué avec les dernières technologies web
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Le jeu auquel vous allez jouer a été codé avec les dernières
              technologies présentes sur le marché (react JS, Node JS,
              Tailwindcss, HTML 5 et CSS 3). Le but est de vous apporter une
              expérience optimale avec un design épuré et des animations hors du
              commun.
            </p>
          </div>
          <div
            ref={logosIcon}
            className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2"
          >
            {logos.map(logo => (
              <Logo src={logo.src} alt={logo.alt} href={logo.href} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
