import React from 'react';

const Alert = ({children, type}) => {
  console.log(type)
  return (
    <div className={type}>
      { children }
    </div>
  )
}

export default Alert
