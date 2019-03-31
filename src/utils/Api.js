const init = (method, body = undefined) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  };
};

class API {
  static fetchOwnerUrls() {
    return fetch('/api/urls', init('GET'))
      .then(res => res.json())
      .then(ownerUrls => ownerUrls)
      .catch(() => [])
  }

  static postShortenUrl = (inputUrl) => {
    const data = {
      urlToShorten: inputUrl.includes('http') ? inputUrl : `http://${inputUrl}`
    };
    return fetch('/api/shorten-url', init('POST', data))
      .then(res => res.json())
      .then(response => response)
  };
}

export default API;
