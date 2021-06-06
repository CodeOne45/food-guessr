import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import hamburger from 'Assets/img/hamburger.svg';

export default function BurgerLogo() {
  const burger = React.createRef();
  const burgerTween = React.useRef();

  useEffect(() => {
    burgerTween.current = gsap.to(burger.current, {
      rotation: 360,
      duration: 1,
      paused: true,
    });
  });

  return (
    <img
      src={hamburger}
      alt="Hamburger"
      className="h-10 w-auto"
      ref={burger}
      onMouseEnter={() => burgerTween.current.play()}
      onMouseLeave={() => burgerTween.current.reverse()}
    />
  );
}
