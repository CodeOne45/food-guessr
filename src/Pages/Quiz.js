import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import AnimatedClouds from 'Components/AnimatedClouds/AnimatedClouds';
import Answer from 'Components/Answer/Answer';
import BurgerLogo from 'Components/BurgerLogo/BurgerLogo';
import Question from 'Components/Question/Question';
import World from 'Components/World/World';

export default function Quiz() {
  const [goodAnswer, setGoodAnswer] = useState('');
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [result, setResult] = useState('');
  const countriesAPI = 'https://restcountries.eu/rest/v2/name/';

  const closeSideBarTween = React.useRef();
  const openSideBarTween = React.useRef();
  const sideBar = React.createRef();

  useEffect(() => {
    closeSideBarTween.current = gsap.to(sideBar.current, {
      x: '-100%',
      ease: 'back.in(0.5)',
      duration: 1,
      paused: true,
    });
    openSideBarTween.current = gsap.to(sideBar.current, {
      x: 0,
      ease: 'back.out(0.5)',
      duration: 1,
      paused: true,
    });
  });

  const callbackGoodAnswer = answer => {
    setGoodAnswer(answer);
  };

  const checkAnswer = pAnswer => {
    fetch(countriesAPI + pAnswer)
      .then(res => res.json())
      .then(
        data => {
          if (data[0].demonym === goodAnswer) setResult('OK');
          else setResult('Non OK');
        },
        error => {
          console.log(error);
        }
      );
  };

  const callbackPlayerAnswer = pAnswer => {
    setPlayerAnswer(pAnswer);
    checkAnswer(pAnswer);
  };

  return (
    <div className="flex flex-row h-screen">
      <div
        ref={sideBar}
        className="absolute z-20 w-3/5 md:w-1/5 h-screen flex flex-col pt-5 pb-4 bg-white"
      >
        <div className="flex justify-between flex-shrink-0 px-4 items-center">
          <div className="h-8 w-auto" />
          <BurgerLogo />

          <button
            type="button"
            className="bg-yellow-100 rounded-md p-2 inline-flex items-center justify-center text-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none"
            onClick={() => closeSideBarTween.current.restart()}
          >
            <XIcon className="h-6 w-auto" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 px-6 flex-grow">
          <nav className="flex flex-col px-2" aria-label="Sidebar">
            <Question parentCallback={callbackGoodAnswer} />
            <Answer playerAnswer={playerAnswer} result={result} />
          </nav>
        </div>
      </div>
      <button
        type="button"
        onClick={() => openSideBarTween.current.restart()}
        className="absolute z-10 mt-4 ml-4 bg-yellow-100 rounded-md p-2 inline-flex items-center justify-center text-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none"
      >
        <MenuIcon className="h-6 w-auto" aria-hidden="true" />
      </button>
      <div className="flex-1">
        <World parentCallback={callbackPlayerAnswer} />
      </div>
      <AnimatedClouds />
    </div>
  );
}
