import { React } from 'react';
import PropTypes from 'prop-types';

export default function NavLink({ name, href, additionalStyle }) {
  return (
    <a
      key={name}
      href={href}
      className={`text-base font-medium text-gray-700 ${additionalStyle}`}
    >
      {name}
    </a>
  );
}

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  additionalStyle: PropTypes.string.isRequired,
};
