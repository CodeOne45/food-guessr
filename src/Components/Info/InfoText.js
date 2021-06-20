import React from 'react';
import PropTypes from 'prop-types';

export default function InfoText({ text, colorText }) {
  return (
    <p>
      <span className="font-bold text-gray-900">{text} : </span>
      <span className="font-medium text-yellow-600">{colorText}</span>
    </p>
  );
}

InfoText.propTypes = {
  text: PropTypes.string.isRequired,
  colorText: PropTypes.string.isRequired,
};
