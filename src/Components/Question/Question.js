/* eslint-disable react/prop-types */
import React from 'react';

export default function Question({ meal, play }) {
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
        {/* Area a retirer */}
        <p>
          Area : <span className="bg-black hover:bg-white">{meal.strArea}</span>
        </p>
        <img // TODO: img peut être factorisé en atome
          id="quiz-img"
          src={meal.strMealThumb} // si meal est null, mettre une img d'erreur
          alt="meal"
          className="h-full w-60 object-cover"
        />
      </div>
    </div>
  );
}
