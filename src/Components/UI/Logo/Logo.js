import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

export default function Logo({ src, alt, href }) {
  const logo = React.createRef();
  const logoTween = React.createRef();

  useEffect(() => {
    logoTween.current = gsap.to(logo.current, {
      scale: 2,
      paused: true,
    });
  });

  return (
    <a
      href={href}
      className="col-span-1 flex justify-center py-8 px-8 bg-gray-50"
    >
      <img
        className="max-h-16"
        src={src}
        alt={alt}
        ref={logo}
        onMouseEnter={() => logoTween.current.play()}
        onMouseLeave={() => logoTween.current.reverse()}
      />
    </a>
  );
}

Logo.propTypes = {
  alt: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
