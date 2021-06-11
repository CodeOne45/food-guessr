import React from 'react';
import PropTypes from 'prop-types';

export default function Answer({ pAnswerCountry, result, score }) {
  return (
    <div className="md:text-lg mt-6 space-y-3">
      <p>
        <span className="font-bold text-gray-900">Pays choisis : </span>
        <span className="font-medium text-yellow-600">{pAnswerCountry}</span>
      </p>
      <p>
        <span className="font-bold text-gray-900"> Réponse : </span>
        <span className="font-medium text-yellow-600">{result}</span>
      </p>
      <p>
        <span className="font-bold text-gray-900"> Score actuel : </span>
        <span className="font-medium text-yellow-600">{score}</span>
      </p>
    </div>
  );
}
Answer.propTypes = {
  pAnswerCountry: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
