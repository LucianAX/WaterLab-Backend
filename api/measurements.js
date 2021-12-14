const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

const measurementsRouter = express.Router();

measurementsRouter.get('/', (req, res, next) => {
    db.all(`
        SELECT *
        FROM Measurement
        ORDER BY timestamp DESC;
        `, (err, allMeasurements) => {
            err
                ? next(err)
                : res.status(200).send({ measurements: allMeasurements });
        }
    );
});

measurementsRouter.post('/', (req, res, next) => {
    const timestamp = req.body.measurement.timestamp;
    const phValue = req.body.measurement.phValue;
    const tempC = req.body.measurement.tempC;
    const elecCond = req.body.measurement.elecCond;
    const stationaryUnitID = req.body.measurement.stationaryUnitID;
    const hasWarning = req.body.measurement.hasWarning;

    if (!timestamp || !phValue || !tempC || !elecCond || !stationaryUnitID) {
        return res.status(400).send('At least one of the required fields is missing!');
    }

    db.run(`
        INSERT INTO Measurement
            (timestamp, ph_value, temperature_celsius, electric_conductivity, stationary_unit_id, has_warning)
        VALUES
            ($timestamp, $phValue, $tempC, $elecCond, $stationaryUnitID, $hasWarning);
        `,
        {
            $timestamp: timestamp,
            $phValue: phValue,
            $tempC: tempC,
            $elecCond: elecCond,
            $stationaryUnitID: stationaryUnitID,
            $hasWarning: hasWarning
        },
        function(err) {
            if (err) {
                return next(err);
            }
            db.get(`
                SELECT *
                FROM Measurement
                WHERE id = ${this.lastID};
                `, (err, newMeasurement) => {
                    err
                        ? next(err)
                        : res.status(201).send({ measurement: newMeasurement });
                }
            );
        }
    );
});

module.exports = measurementsRouter;