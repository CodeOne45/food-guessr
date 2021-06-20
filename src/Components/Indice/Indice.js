import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfoText from 'Components/InfoText/InfoText';

export default function Indice({ info }) {
  const [nbClick, setNbClick] = useState(0);
  const [indiceList, setIndiceList] = useState([]);
  return info ? (
    <>
      <button
        type="button"
        onClick={() => {
          setNbClick(nbClick + 1);
          setIndiceList([
            <InfoText
              text="Indice 1"
              colorText={info ? `The answer is in ${info.region}` : 'Error'}
            />,
            <InfoText
              text="Indice 2"
              colorText={
                info ? `More specifically in ${info.subregion}` : 'Error'
              }
            />,
          ]);
        }}
        className="font-medium bg-yellow-400 hover:bg-yellow-700 mt-3 px-7 py-3 rounded text-white w-full"
      >
        Aide {nbClick}
      </button>
      <div>{indiceList.slice(0, nbClick)}</div>
    </>
  ) : (
    ''
  );
}

Indice.propTypes = {
  info: PropTypes.shape.isRequired,
};
