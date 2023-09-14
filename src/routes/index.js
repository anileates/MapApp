const express = require('express');
const indexRouter = express();

const rateLimit  = require("express-rate-limit");

const limiter = rateLimit({
    windowsMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests
})

indexRouter.use('/locations', limiter, require('./location'));

module.exports = indexRouter;