import React, { useState, useEffect } from 'react';
import API from '../../utils/Api';

const OwnerUrls = () => {
  const [ownerUrls, setOwnerUrls] = useState([]);

  useEffect(() => {
    (async () => setOwnerUrls(await API.fetchOwnerUrls()))();
  }, []);

  return (
    <div>
      {ownerUrls.map(link => (
        <p key={link.shortenUrl}>
          <a href={link.shortenUrl}>{link.shortenUrl}</a> -
          <a href={link.url}>{link.url}</a> - {link.visited}
        </p>
      ))}
    </div>
  );
};

export { OwnerUrls as default };
