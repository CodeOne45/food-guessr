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
      {
        scale: 1,

        rotation: 360,
        ease: 'back.out(1.7)',
        duration: 0.7,
      }
    );
  }, []);

  return (
    <img ref={burger} src={hamburger} alt="Hamburger" className="h-10 w-auto" />
  );
}
