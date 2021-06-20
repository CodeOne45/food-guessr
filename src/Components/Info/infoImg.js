import React from 'react';
import PropTypes from 'prop-types';

export default function InfoText({ text, url }) {
  return (
    <>
      <p>
        <span className="font-bold text-gray-900">{text} : </span>
      </p>
      <div className="p-1 w-28 h-auto bg-gray-500">
        <img src={url} alt="Flag" />
      </div>
    </>
  );
}

InfoText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  url: PropTypes.string.isRequired,
};
