import Question from 'Components/Question/Question';
import World from 'Components/World/World';
import React from 'react';

export default function Quiz() {
  return (
    <div id="quiz">
      <div id="quiz-modal">
        <Question />
        <p id="player-answer" />
        <p id="good-answer" />
      </div>
      <World />
    </div>
  );
}
