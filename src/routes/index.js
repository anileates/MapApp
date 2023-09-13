const express = require('express');
const indexRouter = express();

indexRouter.use('/locations', require('./location'));

module.exports = indexRouter;