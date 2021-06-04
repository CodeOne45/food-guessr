import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <div id="meal-question" className="w-full">
      <div style={meal.strMeal ? { display: 'block' } : { display: 'none' }}>
        <div className="space-y-3 flex flex-col items-center ">
          <div className="md:text-xl">
            <p>
              <span className="font-bold text-gray-900">Name : </span>
              <span className="font-medium text-yellow-600">
                {meal.strMeal}
              </span>
            </p>
            <p>
              <span className="font-bold text-gray-900">Area : </span>
              <span className="font-medium text-yellow-600">
                {meal.strArea}
              </span>
            </p>
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
          play();
        }}
        className="font-medium bg-yellow-600 hover:bg-yellow-700 mt-3 px-7 py-3 rounded text-white w-full"
      >
        J&#39;ai faim !
      </button>
    </div>
  );
}

Question.propTypes = {
  parentCallback: PropTypes.string.isRequired,
};
