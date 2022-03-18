const express = require('express');

const apiRouter = express.Router();
const measurementsRouter = require('./measurements.js');
const warningsRouter = require('./warnings.js');
const stationaryUnitRouter = require('./stationaryUnit.js');

apiRouter.use('/measurements', measurementsRouter);
apiRouter.use('/warnings', warningsRouter);
apiRouter.use('/stationaryUnit', stationaryUnitRouter);

module.exports = apiRouter;