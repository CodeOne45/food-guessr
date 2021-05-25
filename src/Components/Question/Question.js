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
      <button type="button" onClick={play}>
        J&#39;ai Faim !
      </button>
      <div style={meal.strMeal ? { display: 'block' } : { display: 'none' }}>
        <p>Name : {meal.strMeal}</p>
        <p>Area : {meal.strArea}</p>
        Image : <image src={meal.strMealThumb} alt="meal picture" />
      </div>
    </div>
  );
}
