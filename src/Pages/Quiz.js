import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Question from 'Components/Question/Question';
import World from 'Components/World/World';
import './Quiz.css';

export default function Quiz() {
  const [meal, setMeal] = useState({});
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const countriesAPI = 'https://restcountries.eu/rest/v2/name/';
  const randomMealAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
  // const randomCustomMealAPI = 'https://api-food-guessr.herokuapp.com/meals/random';

  const cloudsFirstLayer = React.createRef();
  const cloudsSecondLayer = React.createRef();
  const overlay = React.createRef();

  useEffect(() => {
    gsap.to(cloudsFirstLayer.current, { x: '-100%', delay: 1, duration: 1 });
    gsap.to(cloudsSecondLayer.current, { x: '100%', delay: 1, duration: 1 });
    gsap.to(overlay.current, { y: '-100%', delay: 2 });
  }, []);

  const reset = () => {
    console.log('');
  };

  const play = () => {
    reset();
    fetch(randomMealAPI)
      .then(res => res.json())
      .then(
        data => {
          try {
            setMeal(data.meals[0]);
            console.log(data.meals[0]); // TODO a retirer
          } catch (err) {
            console.log(err); // TypeError
          }
        },
        error => {
          console.log(error); // SyntaxError
        }
      );
  };

  const checkAnswer = pAnswer => {
    fetch(countriesAPI + pAnswer)
      .then(res => res.json())
      .then(
        data => {
          if (data[0].demonym === meal.strArea) {
            setResult('OK');
            setScore(score + 100);
          } else setResult('Non OK');
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
    <section>
      <div id="quiz">
        <div
          id="quiz-modal"
          className="m-1 p-1 absolute bg-white top-0 w-60 z-10 rounded" // TODO rendre responsive
        >
          <Question meal={meal} play={play} />
          <p>Pays choisis : {playerAnswer}</p>
          <p>Result : {result}</p>
        </div>
        <div
          id="quiz-score"
          className="m-1 p-1 absolute bg-white right-0 w-60 z-10 rounded" // TODO rendre responsive
        >
          <p>Score : {score}</p>
        </div>
      </div>
      <div id="world-3d">
        <World parentCallback={callbackPlayerAnswer} />
      </div>
      <div className="overlay" ref={overlay}>
        <div className="layer layer-1" ref={cloudsFirstLayer} />
        <div className="layer layer-2" ref={cloudsSecondLayer} />
      </div>
    </section>
  );
}
