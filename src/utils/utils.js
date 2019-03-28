const isUrlValid = inputUrl =>
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm.test(
    inputUrl
  );

module.exports = { isUrlValid };
