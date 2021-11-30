const express = require('express');

const apiRouter = express.Router();
const measurementsRouter = require('./measurements.js');

apiRouter.use('/measurements', measurementsRouter);

module.exports = apiRouter;