const router = require('express').Router();
const { baseUrl } = require('../config/config');
const UrlShort = require('../models/urlShort');
const { uniqUrl } = require('../utils');

router.post('/shorten-url', async (req, res) => {
  const uniq = await uniqUrl();
  const urlShort = await new UrlShort({
    shorten: uniq,
    url: req.body.urlToShorten,
    customUrl: req.body.customUrl,
    sessionOwner: req.sessionID
  });
  await urlShort.save();
  res.json({ ...urlShort, shortenUrl: `${baseUrl}${urlShort.shorten}` });
});

router.get('/urls', async (req, res) => {
  const urlsInDB = await UrlShort.find({
    sessionOwner: req.sessionID
  });
  const x = urlsInDB.map(url => ({
    url: `${baseUrl}${url.shorten}`,
    visited: url.visited
  }));
  res.json(x);
});

module.exports = router;