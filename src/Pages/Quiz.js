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
  const nbAttemptsMax = 0;
  const distanceMax = 5000;

  const [meal, setMeal] = useState({}); // data about the current meal
  const [country, setCountry] = useState({}); // data about the country of the current meal
  const [countriesAPI, setCountriesAPI] = useState([]); // data about all countries
  const [playerAnswer, setPlayerAnswer] = useState([]);
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [attempts, setAttempts] = useState(nbAttemptsMax);
  const [points, setPoints] = useState(0);
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
        item => item.name === meal.strArea || item.demonym === meal.strArea // TODO a changer pour le iso a3
      )
    );
  }, [meal]);

  useEffect(() => {
    setScore(score + points);
  }, [points]);

  const reset = () => {
    setAttempts(nbAttemptsMax);
    // setDistance(0);
    setPlayerAnswer('');
    setPoints(0);
    setResult('');
  };

  const play = () => {
    reset();
    fetch(randomMealAPI)
      .then(res => res.json())
      .then(
        data => {
          try {
            if (data.meals[0].strArea === 'Unknown') {
              play();
            } else {
              setMeal(data.meals[0]);
            }
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

  const calculatePoints = () => {
    const pts = Math.round((distanceMax - distance) / 5);
    setPoints(pts < 0 ? 0 : pts);
    setOpenModal(true);
  };

  const checkAnswer = pAnswerISOA3 => {
    try {
      if (pAnswerISOA3 === country.alpha3Code) {
        setResult('Trouvé !'); // TODO A CHANGER
        calculatePoints();
      } else if (attempts === 0) {
        setResult(`:(`);
        calculatePoints();
      } else {
        setResult(`Dommage, il vous reste ${attempts} essais`);
        setAttempts(attempts - 1);
      }
    } catch (err) {
      console.log(`[Err] No data on the selected country : ${err}`);
    }
  };

  const checkPlayerAnswer = (pChoice, pISOA3, pDistance) => {
    setPlayerAnswer([pChoice, pISOA3]);
    setDistance(pDistance);
  };

  const guess = () => {
    try {
      if (!playerAnswer[0] && !playerAnswer[1]) {
        setResult('Veillez choisir un pays...');
      } else checkAnswer(playerAnswer[1]);
    } catch (err) {
      console.log(`[Err] No Guess : ${err}`);
    }
  };

  const nextGame = () => {
    setOpenModal(false);
    play();
  };

  return (
    <div className="flex flex-row h-full">
      {/* Side Bar */}
      <div
        ref={sideBar}
        className="absolute z-20 w-3/5 sm:w-2/5 md:w-2/5 lg:w-1/5 h-full flex flex-col pt-5 bg-white"
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
            <Question meal={meal} play={play} guess={guess} />
            <Answer
              pAnswerCountry={playerAnswer[0]}
              result={result}
              score={score}
            />
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
          parentCallback={checkPlayerAnswer}
          openSideBar={() => openSideBarTween.current.restart()}
          countriesAPI={countriesAPI}
          goodCountry={country}
        />
      </div>
      {/* Result Modal */}
      <Modal
        goodCountry={country}
        openModal={openModal}
        setOpenModal={setOpenModal}
        nextGame={nextGame}
        distance={distance}
        points={points}
      />
      {/* Loading animation */}
      <AnimatedClouds />
    </div>
  );
}
