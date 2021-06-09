import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import AnimatedClouds from 'Components/AnimatedClouds/AnimatedClouds';
import Answer from 'Components/Answer/Answer';
import BurgerLogo from 'Components/BurgerLogo/BurgerLogo';
import foodGuessrURL from 'foodGuessrURL';
import Link from 'Components/UI/Link/Link';
import Modal from 'Components/Modal/Modal';
import Question from 'Components/Question/Question';
import World from 'Components/World/World';

export default function Quiz() {
  const [meal, setMeal] = useState({});
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const countriesAPI = 'https://restcountries.eu/rest/v2/alpha?codes=';
  const randomMealAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
  // const randomCustomMealAPI = 'https://api-food-guessr.herokuapp.com/meals/random';

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
  }, []);

  const reset = () => {
    setPlayerAnswer('');
    setPlayerAnswer('');
  };

  const play = () => {
    reset();
    fetch(randomMealAPI)
      .then(res => res.json())
      .then(
        data => {
          try {
            setMeal(data.meals[0]);
            // console.log(data.meals[0]); // TODO a retirer
          } catch (err) {
            console.log(err); // TypeError
          }
        },
        error => {
          console.log(error); // SyntaxError
        }
      );
  };

  const checkAnswer = pAnswerISOA3 => {
    fetch(countriesAPI + pAnswerISOA3)
      .then(res => res.json())
      .then(
        data => {
          try {
            if (data[0].demonym === meal.strArea) {
              setResult('OK'); // TODO A CHANGER
              setScore(score + 100);
            } else setResult('Non OK');
          } catch (err) {
            console.log(`[Err] No data on the selected country : ${err}`);
          }
        },
        error => {
          console.log(`[Err] Checking answer fail : ${error}`);
        }
      );
  };

  const callbackPlayerAnswer = (pAnswerName, pAnswerISOA3) => {
    setPlayerAnswer(pAnswerName);
    checkAnswer(pAnswerISOA3);
  };

  return (
    <div className="flex flex-row h-full">
      <div
        ref={sideBar}
        className="absolute z-20 w-3/5 md:w-1/5 h-full flex flex-col pt-5 bg-white"
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
            <Question meal={meal} play={play} />
            <Answer playerAnswer={playerAnswer} result={result} />
          </nav>
        </div>
        <Link
          content="Retourner à l'accueil"
          href={foodGuessrURL.home}
          type="light"
        />
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
      <Modal />
      <AnimatedClouds />
    </div>
  );
}
