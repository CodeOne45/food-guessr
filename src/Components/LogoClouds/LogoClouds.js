import React from 'react';
import htmlCssLogo from 'Assets/img/htmlCss.svg';
import nodeJsLogo from 'Assets/img/nodeJs.svg';
import reactLogo from 'Assets/img/react.svg';
import tailwindLogo from 'Assets/img/tailwind.svg';
import Logo from 'Components/UI/Logo/Logo';

const logos = [
  { src: reactLogo, alt: 'React', href: 'https://fr.reactjs.org/' },
  { src: nodeJsLogo, alt: 'nodeJS', href: 'https://nodejs.org/fr/' },
  { src: htmlCssLogo, alt: 'htmlCss', href: '/' },
  { src: tailwindLogo, alt: 'TailwindCss', href: 'https://tailwindcss.com/' },
];

export default function LogoClouds() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Fabriqué avec les dernières technologies web
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
            {logos.map(logo => (
              <Logo src={logo.src} alt={logo.alt} href={logo.href} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
