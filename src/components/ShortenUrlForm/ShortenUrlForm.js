import React, { useState } from 'react';

export const ShortenUrlForm = props => {
  const [inputUrl, setInputUrl] = useState('');
  const [customInputUrl] = useState('');

  const handleInputUrl= (e) => {
    const text = e.target.value.replace(/ /g, '');
    if (text.match(/\.\./g)) return
     setInputUrl(text);
  }

  const postShortenUrl = async () => {
    const validUrlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;

    if (inputUrl.match(validUrlRegex)) {
      const data = {
        urlToShorten: inputUrl.includes('http')
          ? inputUrl
          : `http://${inputUrl}`,
        customUrl: customInputUrl
      };
      fetch('/api/shorten-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(response => {
          props.setNewUrlMade(response);
        })
        .catch(e => {
          props.setError('Could not shorten your URL.');
        });
    } else {
      props.setError('Not valid URL.');
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (inputUrl.length < 3) {
      return;
    }
    setInputUrl('');
    postShortenUrl();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputUrl}
        onChange={handleInputUrl}
      />
      <button>Shorten</button>
    </form>
  );
};
