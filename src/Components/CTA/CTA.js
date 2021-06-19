import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import globe from 'Assets/img/globe.jpg';
import Link from 'Components/UI/Link/Link';
import foodGuessrURL from 'foodGuessrURL';

export default function CTA() {
  const CtaText = React.createRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(CtaText.current, {
      y: '100%',
      opacity: 0,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '#cta',
        start: 'top center',
        end: 'top top',
        toggleActions: 'play none none reset',
      },
    });
  });
  return (
    <section id="cta" className="relative py-16 bg-white">
      <div
        className="hidden absolute top-0 inset-x-0 h-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto bg-yellow-600 lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
            <div
              className="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden"
              aria-hidden="true"
            />
            <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="hidden lg:block aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                <img
                  className=" object-cover object-center rounded-3xl shadow-2xl"
                  src={globe}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="relative bg-yellow-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
            <div
              className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block"
              aria-hidden="true"
            >
              <svg
                className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
              <svg
                className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
            </div>
            <div
              ref={CtaText}
              className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6"
            >
              <h2
                className="text-3xl font-extrabold text-white"
                id="join-heading"
              >
                Why Food-Guessr ?
              </h2>
              <p className="text-lg text-white">
                L’objectif est de vous faire découvrir de nombreux plats afin
                d’explorer la culture culinaire des différents pays, et ce, avec
                une touche de fun.
              </p>
              <Link
                href={foodGuessrURL.quiz}
                content="Un tour du monde des spécialités culinaires"
                type="light"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
