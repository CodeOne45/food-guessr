import { React } from 'react';
import PropTypes from 'prop-types';

export default function Logo({ src, alt }) {
  return (
    <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
      <img className="max-h-12" src={src} alt={alt} />
    </div>
  );
}

Logo.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
