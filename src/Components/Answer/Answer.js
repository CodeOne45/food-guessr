import React from 'react';
import PropTypes from 'prop-types';
import InfoText from 'Components/InfoText/InfoText';

export default function Answer({ pAnswerCountry, result, score }) {
  return (
    <div className="md:text-lg mt-6 space-y-3">
      <InfoText text="Pays choisis" colorText={pAnswerCountry} />
      <InfoText text="Réponse" colorText={result} />
      <InfoText text="Score actuel" colorText={score} />
    </div>
  );
}
Answer.propTypes = {
  pAnswerCountry: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
