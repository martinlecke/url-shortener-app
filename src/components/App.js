import React, { useState } from 'react';
import { ShortenUrlForm } from './ShortenUrlForm/ShortenUrlForm';
import { OwnerUrls } from './OwnerUrls/OwnerUrls';

const App = () =>  {
  const [error, setError] = useState('');
  const [newUrlMade, setNewUrlMade] = useState([]);

  return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Url Shortener</h1>
          <ShortenUrlForm
            setError={setError}
            setNewUrlMade={setNewUrlMade}
          />
          {newUrlMade && (
            <p>
              <a href={`${newUrlMade.shortenUrl}`}>
                {`${newUrlMade.shortenUrl}`}
              </a>
            </p>
          )}
          {error && <p>{error}</p>}
          <OwnerUrls />
        </header>
      </div>
    );
  }


export default App;
