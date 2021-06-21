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
      },
      { scale: 1, rotation: 360, delay: 0.5 }
    );
  });

  return (
    <img ref={burger} src={hamburger} alt="Hamburger" className="h-10 w-auto" />
  );
}
