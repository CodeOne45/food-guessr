import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
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
        <div className="flex justify-between flex-shrink-0 px-4 items-center">
          <div className="h-8 w-auto" />
          <BurgerLogo />
          <XIcon className="h-8 w-auto" aria-hidden="true" />
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
