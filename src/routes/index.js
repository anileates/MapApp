const express = require('express');
const indexRouter = express();

indexRouter.use('/location', require('./location'));

module.exports = indexRouter;