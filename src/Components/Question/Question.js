/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export default function Question({ parentCallback }) {
  const [meal, setMeal] = useState({});

  const randomMealAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
  // const randomMealAPI = 'https://api-food-guessr.herokuapp.com/meals/random';

  const play = () => {
    fetch(randomMealAPI)
      .then(res => res.json())
      .then(
        data => {
          try {
            setMeal(data.meals[0]);
            console.log(data.meals[0]); // TODO a retirer
            parentCallback(data.meals[0].strArea);
          } catch (err) {
            console.log(err); // TypeError
          }
        },
        error => {
          console.log(error); // SyntaxError
        }
      );
  };

  return (
    <div id="meal-question">
      <button
        id="quiz-play"
        type="button"
        onClick={() => {
          play();
        }}
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
          className="h-full w-60 object-cover"
        />
      </div>
    </div>
  );
}
