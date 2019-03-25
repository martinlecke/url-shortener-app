const router = require('express').Router();
const { devUrl } = require('../config/config');
const UrlShort = require('../models/urlShort');
const path = require('path');

router.get('/:urlShort', async (req, res) => {
  const urlShort = req.params.urlShort;
  const urlInDB = await UrlShort.findOne({
    shorten: urlShort
  });
  if (urlInDB) {
    urlInDB.visited++;
    await urlInDB.save();
    return res.redirect(urlInDB.url);
  }
  res.redirect(devUrl);
});

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = router;