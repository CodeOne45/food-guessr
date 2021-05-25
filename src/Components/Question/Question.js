import React, { useState } from 'react';

export default function Question() {
  const [meal, setMeal] = useState({});
  const randomMealAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';

  const play = () => {
    fetch(randomMealAPI)
      .then(res => res.json())
      .then(
        data => {
          setMeal(data.meals[0]);
          // eslint-disable-next-line
          console.log(data.meals[0]);
        },
        error => {
          // eslint-disable-next-line
          console.log(error);
        }
      );
  };

  return (
    <div id="meal-question">
      <button
        id="quiz-play"
        type="button"
        onClick={play}
        className="font-medium bg-yellow-600 hover:bg-yellow-700 px-7 py-3 rounded text-white w-full"
      >
        J&#39;ai Faim !
      </button>
      <div style={meal.strMeal ? { display: 'block' } : { display: 'none' }}>
        <p>Name : {meal.strMeal}</p>
        <p>
          Area : <span className="bg-black hover:bg-white">{meal.strArea}</span>
        </p>
        {/* TODO: img peut être factorisé en atome */}
        <img
          id="quiz-img"
          src={meal.strMealThumb} // si meal est null, mettre une img d'erreur
          alt="meal"
          className="h-full w-auto object-cover"
        />
      </div>
    </div>
  );
}
