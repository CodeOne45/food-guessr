import React from 'react';
import PropTypes from 'prop-types';

export default function Member({ name, imageUrl, role }) {
  return (
    <li key={name}>
      <div className="flex items-center space-x-4 lg:space-x-6">
        <img
          className="w-16 h-16 rounded-full bg-yellow-200 lg:w-20 lg:h-20"
          src={imageUrl}
          alt=""
        />
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
  imageUrl: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
