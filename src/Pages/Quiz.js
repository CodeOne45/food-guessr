import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import AnimatedClouds from 'Components/AnimatedClouds/AnimatedClouds';
import Answer from 'Components/Answer/Answer';
import BurgerLogo from 'Components/BurgerLogo/BurgerLogo';
import foodGuessrURL from 'foodGuessrURL';
import Link from 'Components/UI/Link/Link';
import Question from 'Components/Question/Question';
import World from 'Components/World/World';

export default function Quiz() {
  const [meal, setMeal] = useState({}); // data about the current meal
  const [country, setCountry] = useState(); // data about the country of the current meal
  const [countriesAPI, setCountriesAPI] = useState([]); // data about all countries
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const countriesNameURL = './restcountries_all.json';
  // const countriesAPIURL = 'https://restcountries.eu/rest/v2/alpha?codes=';
  const randomMealAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
  // const randomMealAPI = 'https://api-food-guessr.herokuapp.com/meals/random';

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
    // load countries name data (src: https://restcountries.eu/)
    fetch(countriesNameURL)
      .then(res => res.json())
      .then(setCountriesAPI);
  }, []);

  useEffect(() => {
    setCountry(
      countriesAPI.find(
        item => item.demonym === meal.strArea || item.name === meal.strArea // TODO a changer pour le iso a3
      )
    );
  }, [meal]);

  const reset = () => {
    setPlayerAnswer('');
    setResult('');
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
    try {
      if (pAnswerISOA3 === country.alpha3Code) {
        setResult('OK'); // TODO A CHANGER
        setScore(score + 100);
      } else setResult('Non OK');
    } catch (err) {
      console.log(`[Err] No data on the selected country : ${err}`);
    }
  };

  const callbackPlayerAnswer = (pAnswerName, pAnswerISOA3) => {
    setPlayerAnswer(pAnswerName);
    checkAnswer(pAnswerISOA3);
  };

  return (
    <div className="flex flex-row h-full">
      {/* Side Bar */}
      <div
        ref={sideBar}
        className="absolute z-20 w-3/5 md:w-1/5 h-full flex flex-col pt-5 bg-white"
      >
        {/* Logo + close side bar btn */}
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
        {/* Quiz content */}
        <div className="mt-5 px-6 flex-grow">
          <nav className="flex flex-col px-2" aria-label="Sidebar">
            <Question meal={meal} play={play} />
            <Answer playerAnswer={playerAnswer} result={result} />
          </nav>
        </div>
        {/* Go back home btn */}
        <Link
          content="Retourner à l'accueil"
          href={foodGuessrURL.home}
          type="light"
        />
      </div>
      {/* Open Side bar btn */}
      <button
        type="button"
        onClick={() => openSideBarTween.current.restart()}
        className="absolute z-10 mt-4 ml-4 bg-yellow-100 rounded-md p-2 inline-flex items-center justify-center text-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none"
      >
        <MenuIcon className="h-6 w-auto" aria-hidden="true" />
      </button>
      {/* World */}
      <div className="flex-1">
        <World
          parentCallback={callbackPlayerAnswer}
          openSideBar={() => openSideBarTween.current.restart()}
          countriesAPI={countriesAPI}
          goodCountry={country}
        />
      </div>
      {/* Loading animation */}
      <AnimatedClouds />
    </div>
  );
}
