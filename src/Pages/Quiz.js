import Question from 'Components/Question/Question';
import World from 'Components/World/World';
import React, { useState } from 'react';

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
  );
}
