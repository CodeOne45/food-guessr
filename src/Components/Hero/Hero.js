import React, { useEffect } from 'react';
import { gsap, Bounce } from 'gsap';
import foodGuessrURL from 'foodGuessrURL';
import Link from 'Components/UI/Link/Link';
import Nav from 'Components/Nav/Nav';

export default function Hero() {
  const heroButton = React.createRef();
  const heroTitle = React.createRef();
  const heroText = React.createRef();

  useEffect(() => {
    gsap.from(heroTitle.current, {
      y: '-30rem',
      opacity: 0,
      ease: Bounce.easeOut,
      delay: 1.5,
      duration: 1,
    });

    gsap.from(heroText.current, {
      x: '30rem',
      opacity: 0,
      ease: 'back.out(1.5)',
      delay: 2,
      duration: 1,
    });

    gsap.from(heroButton.current, {
      scale: 0,
      delay: 2.5,
      ease: 'back.out(5)',
      duration: 1,
    });
  }, []);

  return (
    <section id="hero" className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <Nav />
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1
                ref={heroTitle}
                className="text-6xl lg:text-8xl font-lobster tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span className="block lg:inline">Food</span>{' '}
                <span className="block text-yellow-600 lg:inline">Guessr</span>
              </h1>
              <p
                ref={heroText}
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                Conquérez le monde culinaire avec food guessr, en survolant le
                globe terrestre et en découvrant les plats des différents pays !
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div ref={heroButton} className="rounded-md shadow">
                  <Link href={foodGuessrURL.quiz} content="Jouer" type="dark" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1594179047519-f347310d3322?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Food"
        />
      </div>
    </section>
  );
}
