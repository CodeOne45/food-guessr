import React from 'react';
import PropTypes from 'prop-types';

export default function Answer({ playerAnswer, result }) {
  return (
    <div className="md:text-lg mt-6 space-y-3">
      <p>
        <span className="font-bold text-gray-900">Pays choisis : </span>
        <span className="font-medium text-yellow-600">{playerAnswer}</span>
      </p>
      <p>
        <span className="font-bold text-gray-900"> Réponse : </span>
        <span className="font-medium text-yellow-600">{result}</span>
      </p>
    </div>
  );
}
Answer.propTypes = {
  playerAnswer: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};
