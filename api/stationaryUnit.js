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
                res.status(403).send('No stationary unit found at specified ID!');                
            } else  {
                res.status(200).send({ stationaryUnit: stationaryUnit });
            }
        }
    );
});

stationaryUnitRouter.put('/:id', (req, res, next) => {
    const ID = req.params.id;
    let query, values;

    if (req.body.measurementInterval) {
        let newMeasurementInterval = req.body.measurementInterval;
        query = `
            UPDATE StationaryUnit
            SET interval_execute_measurement = $newInterval
            WHERE id = $ID;
        `;
        values = {
            $ID: ID,
            $newInterval: newMeasurementInterval
        };
    } else if (req.body.isTimerActive !== undefined) {
        console.log(`Timer statys: ${req.body.isTimerActive}`)
        let newTimerStatus = req.body.isTimerActive ? 1 : 0;
        query = `
            UPDATE StationaryUnit
            SET is_timer_active = $newTimerStatus
            WHERE id = $ID;
        `;
        values = {
            $ID: ID,
            $newTimerStatus: newTimerStatus
        };
    } else if (req.body.limitType) {
        const limitType = req.body.limitType;
        const limitValue = Number(req.body.limitValue);

        query = `
            UPDATE StationaryUnit
            SET ${limitType} = $limitValue
            WHERE id = $ID;
        `;
        values = {
            $ID: ID,
            $limitValue: limitValue
        };
    } else {
        res.status(400).send('Bad request! No body data matches!');
    }

    db.run(query, values, 
        function(err) {
            if (err) {
                return next(err);
            }
            db.get(`
                SELECT *
                FROM StationaryUnit
                WHERE id = $ID;
                `, { $ID: ID },
                (err, updatedStationaryUnit) => {
                    err
                        ? next(err)
                        : res.status(200).send({ updatedStationaryUnit: updatedStationaryUnit });
                }
            );
        }
    );
});

module.exports = stationaryUnitRouter;