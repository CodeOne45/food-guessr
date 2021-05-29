import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Question from 'Components/Question/Question';
import World from 'Components/World/World';
import './Quiz.css';

export default function Quiz() {
  const [goodAnswer, setGoodAnswer] = useState('');
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [result, setResult] = useState('');
  const countriesAPI = 'https://restcountries.eu/rest/v2/name/';

  const cloudsFirstLayer = React.createRef();
  const cloudsSecondLayer = React.createRef();
  const overlay = React.createRef();

  useEffect(() => {
    gsap.to(cloudsFirstLayer.current, { x: '-100%', delay: 1, duration: 1 });
    gsap.to(cloudsSecondLayer.current, { x: '100%', delay: 1, duration: 1 });
    gsap.to(overlay.current, { y: '-100%', delay: 2 });
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
          // eslint-disable-next-line
        console.log(error);
        }
      );
  };

  const callbackPlayerAnswer = pAnswer => {
    setPlayerAnswer(pAnswer);
    checkAnswer(pAnswer);
  };

  return (
    <section>
      <div id="quiz">
        <div
          id="quiz-modal"
          className="m-1 p-1 absolute bg-white top-0 w-60 z-10 rounded"
        >
          <Question parentCallback={callbackGoodAnswer} />
          <p>Pays choisis : {playerAnswer}</p>
          <p>Result : {result}</p>
        </div>
        <World parentCallback={callbackPlayerAnswer} />
      </div>
      <div className="overlay" ref={overlay}>
        <div className="layer layer-1" ref={cloudsFirstLayer} />
        <div className="layer layer-2" ref={cloudsSecondLayer} />
      </div>
    </section>
  );
}
