import Icon from './Icon';
import React from 'react';

const CopyClipboard = ({ copy }) => {

  const copyToClipboard = () => {
    navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.writeText(copy);
      }
    });
  };

  return (
    <button onClick={copyToClipboard}>
      <Icon name="CLIPBOARD" size={20} />
    </button>
  );
};

export default CopyClipboard;
