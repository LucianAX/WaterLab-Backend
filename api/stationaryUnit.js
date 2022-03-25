const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

const stationaryUnitRouter = express.Router();

stationaryUnitRouter.get('/:id', (req, res, next) => {
    const ID = req.params.id;

    db.get(`
        SELECT *
        FROM StationaryUnit
        WHERE id = $ID;
        `, { $ID: ID },
        (err, stationaryUnit) => {
            if (err) {
                next(err);
            }
            if (!stationaryUnit) {
                res.status(403).send('No stationary unit found!');                
            } else  {
                res.status(200).send({ stationaryUnit: stationaryUnit });
            }
        }
    );
});

stationaryUnitRouter.put('/:id', (req, res, next) => {
    const ID = req.params.id;
    const newMeasurementInterval = req.body.measurementInterval;

    db.run(`
        UPDATE StationaryUnit
        SET interval_execute_measurement = $newInterval
        WHERE id = $ID;
        `,
        {
            $ID: ID,
            $newInterval: newMeasurementInterval
        }, 
        function(err) {
            if (err) {
                return next(err);
            }
            db.get(`
                SELECT interval_execute_measurement
                FROM StationaryUnit
                WHERE id = $ID;
                `, { $ID: ID },
                (err, updatedInterval) => {
                    err
                        ? next(err)
                        : res.status(200).send({ updatedInterval: updatedInterval });
                }
            );
        }
    );
});

module.exports = stationaryUnitRouter;