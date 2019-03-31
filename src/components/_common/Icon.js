import React from 'react';
import { PATHS } from '../../utils/iconPaths';

const Icon = ({name, size}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d={PATHS[name]} />
    </svg>
  );
};

export default Icon;
