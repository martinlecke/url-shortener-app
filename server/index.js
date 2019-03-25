const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 1337;
const apiRoutes = require('./routes/Api.routes');
const appRoutes = require('./routes/App.routes');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

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

app.use('/api', apiRoutes);
app.use('/', appRoutes);

app.listen(PORT, () => {
  console.log('Express is running on port', PORT);
});
