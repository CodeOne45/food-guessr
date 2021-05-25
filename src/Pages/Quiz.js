import Question from 'Components/Question/Question';
import World from 'Components/World/World';
import React from 'react';

export default function Quiz() {
  return (
    <div id="Quiz">
      <div id="quizModal">
        <Question />
        <p id="playerAnswer" />
        <p id="goodAnswer" />
      </div>
      <World />
    </div>
  );
}
