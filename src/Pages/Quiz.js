import Question from 'Components/Question/Question';
import World from 'Components/World/World';
import React, { useState } from 'react';

export default function Quiz() {
  const [goodAnswer, setGoodAnswer] = useState('Null');

  const callback = answer => {
    console.log(answer);
    setGoodAnswer(answer);
  };

  const callbackBis = answer => {
    console.log(answer);
  };

  /* const checkAnswer = () => {
    cosole.log('ok');
  }; */

  return (
    <div id="quiz">
      <div
        id="quiz-modal"
        className="m-1 p-1 absolute bg-white top-0 w-60 z-10 rounded"
      >
        <Question parentCallback={callback} />
        <p id="player-answer" />
        <p>{goodAnswer}</p>
      </div>
      <World parentCallback={callbackBis} />
    </div>
  );
}
