import { React } from 'react';
import PropTypes from 'prop-types';

export default function Link({ content, href, type }) {
  return (() => {
    switch (type) {
      case 'dark':
        return (
          <a
            href={href}
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-white hover:border-yellow-600 hover:text-yellow-600 md:py-3 md:text-lg md:px-8"
          >
            {content}
          </a>
        );

      case 'light':
        return (
          <a
            href={href}
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 md:py-4 md:text-lg md:px-10"
          >
            {content}
          </a>
        );

      default:
        return (
          <a href={href} className="/">
            {content}
          </a>
        );
    }
  })();
}

Link.propTypes = {
  content: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
