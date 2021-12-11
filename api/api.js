const express = require('express');

const apiRouter = express.Router();
const measurementsRouter = require('./measurements.js');
const warningsRouter = require('./warnings.js');

apiRouter.use('/measurements', measurementsRouter);
apiRouter.use('/warnings', warningsRouter);

module.exports = apiRouter;