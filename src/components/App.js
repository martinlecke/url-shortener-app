import React, { useState, useEffect } from 'react';
import { ShortenUrlForm } from './ShortenUrlForm/ShortenUrlForm';
import OwnerUrls from './OwnerUrls/OwnerUrls';

const App = () => {
  const [error, setError] = useState('');
  const [newUrlMade, setNewUrlMade] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error])

  return (
    <div>
      <h1>Url Shortener</h1>
      <ShortenUrlForm setError={setError} setNewUrlMade={setNewUrlMade} />
      {newUrlMade && (
        <p>
          <a href={newUrlMade.shortenUrl}>{newUrlMade.shortenUrl}</a>
        </p>
      )}
      {error && <p>{error}</p>}
      <OwnerUrls />
    </div>
  );
};

export default App;
