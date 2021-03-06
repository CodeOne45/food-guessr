import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const aboutTween = useRef();
  const aboutText = React.createRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    aboutTween.current = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'top top',
      },
    });

    aboutTween.current.fromTo(
      aboutText.current,
      {
        y: '100%',
        opacity: 0,
      },
      { y: 0, opacity: 1, ease: 'back.out(1.7)', delay: 0.5 }
    );
  }, []);
  return (
    <section id="about" className="relative py-16 bg-white overflow-hidden">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          className="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto" ref={aboutText}>
          <h1>
            <span className="block text-base text-center text-yellow-600 font-semibold tracking-wide uppercase">
              Introduction
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Explorez le monde de la nourriture!
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            Entre amusement et d??couverte, explorer la cuisine ?? travers tout le
            globe. Food Guessr vous permet de visiter les diff??rents pays via la
            culture de la nourriture. Mais, attention ce jeu risquerait de vous
            ouvrir l???app??tit !
          </p>
        </div>
      </div>
    </section>
  );
}
