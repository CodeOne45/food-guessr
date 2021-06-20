import React from 'react';
import PropTypes from 'prop-types';
import InfoText from 'Components/Info/InfoText';

export default function Answer({ pAnswerCountry, result, score }) {
  return (
    <div className="md:text-lg mt-6 space-y-3">
      <InfoText text="Score actuel" colorText={score} />
      <InfoText text="Pays choisi" colorText={pAnswerCountry} />
      <InfoText text="Information" colorText={result} />
    </div>
  );
}
Answer.propTypes = {
  pAnswerCountry: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};
