/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */

import React, { useState } from 'react';
import World from '../World/World';

function Header() {
  // Button parameters & functions
  const [displayWorld, setDisplayWorld] = useState(false);
  const [txtBtn, setTxtBtn] = useState('Play');

  const changeText = () => {
    // change some state here
    if (txtBtn === 'Home') {
      setTxtBtn('Play');
    } else setTxtBtn('Home');
    setDisplayWorld(!displayWorld);
  };

  return (
    <div className="App-header">
      <p>Food-Guessr</p>
      <a
        className="App-link"
        href="https://github.com/CodeOne45/food-guessr/blob/develop/README.md"
        target="_blank"
        rel="noreferrer"
      >
        Learn more
      </a>
      <button
        type="button"
        onClick={() => {
          changeText();
        }}
      >
        {txtBtn}
      </button>
      {displayWorld ? <World /> : <p> Check your foody skils !</p>}
    </div>
  );
}

export default Header;
