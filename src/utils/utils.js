const isUrlValid = inputUrl => {
  const isValid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm.test(
    inputUrl
  );
  return isValid;
};

const removeHttpString = url => url.replace(/^(?:http(s?)):\/\//g, '');

module.exports = { isUrlValid, removeHttpString };
