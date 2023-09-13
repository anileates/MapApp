const express = require('express');
const indexRouter = express();
const requestValidator = require('../middlewares/requestValidator');
const {createLocationSchema} = require('../validations/locationValidations');

indexRouter.use('/location', requestValidator(createLocationSchema), require('./location'));

module.exports = indexRouter;