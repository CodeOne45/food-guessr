import React from 'react';
import PropTypes from 'prop-types';

export default function Question({ meal, play, guess }) {
  return (
    <div id="meal-question" className="w-full">
      <div style={meal.strMeal ? { display: 'block' } : { display: 'none' }}>
        <div className="space-y-3 flex flex-col items-center ">
          <div className="md:text-lg">
            <p>
              <span className="font-bold text-gray-900">Name : </span>
              <span className="font-medium text-yellow-600">
                {meal.strMeal}
              </span>
            </p>
            {/* Area à retirer, que pour Debug */}
            {/* <p>
              <span className="font-bold text-gray-900">Area : </span>
              <span className="font-medium hover:text-yellow-600 bg-black hover:bg-white">
                {meal.strArea}
              </span>
            </p> */}
          </div>

          <img
            id="quiz-img"
            src={meal.strMealThumb} // si meal est null, mettre une img d'erreur
            alt="meal"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        {/* TODO: img peut être factorisé en atome */}
      </div>
      <button
        id="quiz-play"
        type="button"
        onClick={() => {
          if (meal.strArea) guess();
          else play();
        }}
        className="font-medium bg-yellow-600 hover:bg-yellow-700 mt-3 px-7 py-3 rounded text-white w-full"
      >
        {meal.strArea ? 'Guess' : "J'ai faim !"}
      </button>
    </div>
  );
}

Question.propTypes = {
  meal: PropTypes.shape.isRequired,
  play: PropTypes.func.isRequired,
  guess: PropTypes.func.isRequired,
};
