const UrlShort = require('./models/urlShort');

const uniqUrl = async () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniq = '';

  while (uniq.length < 6) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uniq += chars.charAt(randomIndex);
  }

  const existInDb = await UrlShort.findOne({ shorten: uniq });
  if (existInDb) {
    return uniqUrl();
  }

  return uniq;
};

module.exports = { uniqUrl };
