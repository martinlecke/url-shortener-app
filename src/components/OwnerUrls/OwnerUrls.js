import React, { useState, useEffect } from 'react';

export const OwnerUrls = () => {
  const [ownerUrls, setOwnerUrls] = useState([]);

  useEffect(() => {
    fetch('/api/urls', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(ownerUrls => setOwnerUrls(ownerUrls));
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
