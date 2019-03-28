import React, { useState } from 'react';
import API from '../../utils/Api';

export const ShortenUrlForm = ({ setNewUrlMade, setError }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [customInputUrl, setCustomInputUrl] = useState('');

  const handleInputUrl= (e) => {
    const text = e.target.value.replace(/ /g, '');
    if (text.match(/\.\./g)) return
     setInputUrl(text);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (inputUrl.length < 3) return;
    
    const validUrlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;
    if (validUrlRegex.test(inputUrl)) {
      try {
        const postUrl = await API.postShortenUrl(inputUrl, customInputUrl);
        setInputUrl('');
        setNewUrlMade(postUrl);
      } catch(e) {setError('Could not shorten your URL.')}

    } else { setError('Your URL is unvalid.'); }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputUrl}
        onChange={handleInputUrl}
        placeholder="Paste a link to shorten it"
      />
      <button>Shorten</button>
    </form>
  );
};
