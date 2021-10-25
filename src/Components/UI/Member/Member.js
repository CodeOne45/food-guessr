import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

export default function Member({ name, imageSrc, role, href }) {
  const member = React.createRef();
  const memberTween = React.createRef();

  useEffect(() => {
    memberTween.current = gsap.to(member.current, {
      scale: 1.5,
      paused: true,
    });
  }, []);

  return (
    <li key={name}>
      <div className="flex items-center space-x-4 lg:space-x-6">
        <a href={href}>
          <img
            className="w-16 h-16 rounded-full bg-yellow-200 lg:w-20 lg:h-20"
            src={imageSrc}
            alt={name}
            ref={member}
            onMouseEnter={() => memberTween.current.play()}
            onMouseLeave={() => memberTween.current.reverse()}
          />
        </a>
        <div className="font-medium text-lg leading-6 space-y-1">
          <h3>{name}</h3>
          <p className="text-yellow-600">{role}</p>
        </div>
      </div>
    </li>
  );
}

Member.propTypes = {
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
