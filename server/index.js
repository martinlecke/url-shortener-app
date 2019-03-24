const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 1337;

const UrlShort = require('./models/urlShort');
const { uniqUrl } = require('./utils');

const baseUrl = 'http://localhost:1337/';
const devUrl = 'http://localhost:3000/';

mongoose
  .connect('mongodb://localhost:27017/urlshortener', { useNewUrlParser: true })
  .then(async () => {
    console.log('DB Connected!');
  })
  .catch(err => console.error(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/shorten-url', async (req, res) => {
  const urlShort = await new UrlShort({
    shorten: await uniqUrl(),
    url: req.body.urlToShorten,
    customUrl: req.body.customUrl
  });
  await urlShort.save();
  res.json({ ...urlShort, shortenUrl: `${baseUrl}${urlShort.shorten}` });
});


app.get('/:urlShort', async (req, res) => {
  const urlShort = req.params.urlShort;
  const urlInDB = await UrlShort.findOne({
    shorten: { $regex: `${urlShort}$` }
  });
  if (urlInDB) {
    urlInDB.visited++
    await urlInDB.save();
    return res.json(urlInDB);
  }
  res.redirect(devUrl);
});

app.listen(PORT, () => {
  console.log('Express is running on port', PORT);
});