const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 1337;

mongoose
  .connect('mongodb://localhost:27017/urlshortener', { useNewUrlParser: true })
  .then(async () => {
    console.log('DB Connected!');
  })
  .catch(err => console.error(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.send({ test: 'Test' });
});

app.listen(PORT, () => {
  console.log('Express is running on port', PORT);
});
