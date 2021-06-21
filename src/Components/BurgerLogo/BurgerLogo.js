import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import hamburger from 'Assets/img/hamburger.svg';

export default function BurgerLogo() {
  const burger = React.createRef();

  useEffect(() => {
    gsap.fromTo(
      burger.current,
      {
        scale: 0,
        delay: 0.5,
      },
      { scale: 1, delay: 0.2, rotation: 360 }
    );
  });

  return (
    <img src={hamburger} alt="Hamburger" className="h-10 w-auto" ref={burger} />
  );
}
