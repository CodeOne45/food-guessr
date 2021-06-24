import React from 'react';
import PropTypes from 'prop-types';
import InfoText from 'Components/Info/InfoText';
import InfoImg from 'Components/Info/InfoImg';

export default function Clue({ nbClick, setNbClick, info }) {
  const clueList = [
    <InfoText
      key="infoText1"
      text="Indice 1"
      colorText={info ? `The answer is in ${info.region}` : 'Error'}
    />,
    <InfoText
      key="infoText2"
      text="Indice 2"
      colorText={info ? `More specifically in ${info.subregion}` : 'Error'}
    />,
    <InfoImg
      key="infoText3"
      text="Indice 3"
      url={info ? info.flag : 'Error'}
    />,
  ];
  return info ? (
    <>
      {nbClick < clueList.length ? (
        <button
          type="button"
          onClick={() => {
            setNbClick(nbClick + 1);
          }}
          className="font-medium bg-yellow-400 hover:bg-yellow-500 mt-3 px-7 py-3 rounded text-white w-full"
        >
          Aide restante : {clueList.length - nbClick}
        </button>
      ) : (
        <div />
      )}
      <div id="clueList">{clueList.slice(0, nbClick)}</div>
    </>
  ) : (
    <div />
  );
}

Clue.propTypes = {
  nbClick: PropTypes.number.isRequired,
  setNbClick: PropTypes.func.isRequired,
  info: PropTypes.shape.isRequired,
};
