import { React } from 'react';
import PropTypes from 'prop-types';

export default function Logo({ src, alt, href }) {
  return (
    <a
      href={href}
      className="col-span-1 flex justify-center py-8 px-8 bg-gray-50"
    >
      <img className="max-h-12" src={src} alt={alt} />
    </a>
  );
}

Logo.propTypes = {
  alt: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
