const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/urlshortener', { useNewUrlParser: true })
  .then(async () => {
    console.log('DB Connected!');
  })
  .catch(err => console.error(err));

const baseUrl = 'http://localhost:1337/';
const devUrl = 'http://localhost:3000/';

module.exports = { baseUrl, devUrl };
