import Question from 'Components/Question/Question';
import World from 'Components/World/World';
import React from 'react';

export default function Quiz() {
  return (
    <div id="quiz">
      <div
        id="quiz-modal"
        className="m-1 p-1 absolute bg-white top-0 w-44 z-10 rounded"
      >
        <Question />
        <p id="player-answer" />
      </div>
      <World />
    </div>
  );
}
