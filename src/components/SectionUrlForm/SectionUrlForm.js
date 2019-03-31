import React, { useState, useEffect } from 'react';
import ShortenUrlForm from './ShortenUrlForm/ShortenUrlForm';
import { removeHttpString } from '../../utils/utils';
import Icon from '../_common/Icon';
import Alert from './Alert/Alert';
import './SectionUrlForm.scss';

const SectionUrlForm = () => {
  const [newUrlMade, setNewUrlMade] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);
  return (
    
    <>
      <div className="section-url-form-start">
        <h1>
          <Icon name="BRAND" />
          Shortify
        </h1>
        <ShortenUrlForm setError={setError} setNewUrlMade={setNewUrlMade} />
      </div>
      <div className="section-url-form-end">
        {newUrlMade && (
          <Alert type="success">
            Your Shortified URL:{' '}
            <a href={newUrlMade.shortenUrl} title="Link to your shortened url">
              {removeHttpString(newUrlMade.shortenUrl)}
            </a>
          </Alert>
        )}
        {error && <Alert type="error">{error}</Alert>}
      </div>
    </>
  );
};

export default SectionUrlForm;
