const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 1337;

const UrlShort = require('./models/urlShort');
const { uniqUrl } = require('./utils');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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
app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.post('/api/shorten-url', async (req, res) => {
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

app.get('/api/urls', async (req, res) => {
  const urlsInDB = await UrlShort.find({
    sessionOwner: req.sessionID
  });
  const x = urlsInDB.map(url => ({
    url: `${baseUrl}${url.shorten}`,
    visited: url.visited
  }));
  res.json(x);
});

app.get('/:urlShort', async (req, res) => {
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

app.listen(PORT, () => {
  console.log('Express is running on port', PORT);
});
