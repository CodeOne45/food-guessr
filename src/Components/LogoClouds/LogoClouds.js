import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsapLogo from 'Assets/img/gsap.svg';
import htmlCssLogo from 'Assets/img/htmlCss.svg';
import javascriptLogo from 'Assets/img/javascript.svg';
import nodeJsLogo from 'Assets/img/nodeJs.svg';
import reactLogo from 'Assets/img/react.svg';
import tailwindLogo from 'Assets/img/tailwind.svg';
import Logo from 'Components/UI/Logo/Logo';

const logos = [
  { src: reactLogo, alt: 'React', href: 'https://fr.reactjs.org/' },
  { src: nodeJsLogo, alt: 'nodeJS', href: 'https://nodejs.org/fr/' },
  {
    src: htmlCssLogo,
    alt: 'htmlCss',
    href: 'https://www.w3.org/standards/webdesign/htmlcss.html',
  },
  {
    src: javascriptLogo,
    alt: 'Javascript',
    href: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
  },
  { src: tailwindLogo, alt: 'TailwindCss', href: 'https://tailwindcss.com/' },
  { src: gsapLogo, alt: 'GSAP', href: 'https://greensock.com/gsap/' },
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
  }, []);

  return (
    <section id="logo-clouds" className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div ref={logoCloudsText}>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Fabriqu?? avec les derni??res technologies web
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Le jeu auquel vous allez jouer a ??t?? cod?? avec les derni??res
              technologies pr??sentes sur le march?? (ReactJS, NodeJS,
              TailwindCSS, HTML5/CSS3 et GSAP). Le but est de vous apporter une
              exp??rience optimale avec un design ??pur?? et des animations hors du
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
