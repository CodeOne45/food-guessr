import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
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

  const burger = React.createRef();
  const burgerTween = React.createRef();

  useEffect(() => {
    burgerTween.current = gsap.to(burger.current, {
      rotation: 360,
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
      <div className="absolute z-10 w-1/5 h-screen flex flex-col pt-5 pb-4 bg-white">
        <div className="flex justify-center flex-shrink-0 px-4">
          <BurgerLogo />
        </div>
        <div className="mt-5 px-6 flex-grow">
          <nav className="flex flex-col px-2" aria-label="Sidebar">
            <Question parentCallback={callbackGoodAnswer} />
            <Answer playerAnswer={playerAnswer} result={result} />
          </nav>
        </div>
      </div>
      <div className="flex-1">
        <World parentCallback={callbackPlayerAnswer} />
      </div>
      <AnimatedClouds />
    </div>
  );
}
