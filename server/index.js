const express = require('express');
const PORT = process.env.PORT || 1337;
const middleware = require('./routes/middleware');
const apiRoutes = require('./routes/Api.routes');
const appRoutes = require('./routes/App.routes');

const app = express();

app.use(middleware);
app.use('/api', apiRoutes);
app.use('/', appRoutes);

app.listen(PORT, () => {
  console.log('Express is running on port', PORT);
});
