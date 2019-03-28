const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

module.exports = router;