import React, { useState, useEffect } from 'react';
import API from '../../utils/Api';
import { removeHttpString } from '../../utils/utils';
import './OwnerUrls.scss';

const OwnerUrls = () => {
  const [ownerUrls, setOwnerUrls] = useState([]);

  useEffect(() => {
    (async () => setOwnerUrls(await API.fetchOwnerUrls()))();
  }, []);
  return (
    ownerUrls.length && <div className="owner-urls">
      <h2>Your shorties</h2>
      <ul>
        {ownerUrls.map(link => (
          <li key={link.shortenUrl}>
            <div>
              <a href={link.shortenUrl}>{removeHttpString(link.shortenUrl)}</a>
            </div>
            <div>
              <a href={link.url}>{removeHttpString(link.url)}</a>
            </div>
            <span>{link.visited}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { OwnerUrls as default };
