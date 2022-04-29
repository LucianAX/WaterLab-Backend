const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

const measurementsRouter = express.Router();

measurementsRouter.get('/', (req, res, next) => {
    db.all(`
        SELECT *
        FROM Measurement
        ORDER BY id DESC;
        `, (err, allMeasurements) => {
            err
                ? next(err)
                : res.status(200).send({ measurements: allMeasurements });
        }
    );
});

const checkForBlankInput = (req, res, next) => {
    const { timestamp, phValue, tempC, elecCond, stationaryUnitID } = req.body.measurement;

    if (!timestamp || !phValue || !tempC || !elecCond || !stationaryUnitID) {
        return res.status(400).send('At least one of the required fields is missing!');
    }
    next();
}


const checkForWarning = (req, res, next) => {
    const { phValue, tempC, elecCond, stationaryUnitID } = req.body.measurement;
    let valuesWithWarnings = [];  //assume limits are not breached
    
    db.get(`
        SELECT *
        FROM StationaryUnit
        WHERE id = $ID;
        `, { $ID: stationaryUnitID },
        (err, stUnit) => {
            if (err) {
                return next(err);
            }

            if (phValue < stUnit.limt_ph_minimum || phValue > stUnit.limit_ph_maximum) {    
                valuesWithWarnings.push('ph_value');
            }
            if (tempC < stUnit.limit_temp_minimum || tempC > stUnit.limit_temp_maximum) {
                valuesWithWarnings.push('temperature_celsius');
            }
            if (elecCond < stUnit.limit_ec_minimum || elecCond > stUnit.limit_ec_maximum) {
                valuesWithWarnings.push('electric_conductivity');
            }

            if ( !valuesWithWarnings.length ) {
                req.body.measurement.hasWarning = false;
            } else {
                req.body.measurement.hasWarning = true;
                req.body.measurement.valuesWithWarnings = valuesWithWarnings;
            }
            next();
        }
    );    
}

const createMeasurement = (req, res, next) => {
    let { timestamp, phValue, tempC,
            elecCond, stationaryUnitID, hasWarning } = req.body.measurement;
    
    hasWarning = hasWarning ? 1 : 0; //change form booleans to integers as per DB
    
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
                    if (err) {
                        next(err);
                    }
                    res.status(201).send({ measurement: newMeasurement });
                    
                    if (hasWarning) {
                        req.body.measurement.measurementID = newMeasurement.id;
                        next();
                    }
                }
            );
        }
    );
}

const createWarning = (req, res, next) => {
    let { timestamp, phValue, tempC, elecCond, stationaryUnitID,
        measurementID, valuesWithWarnings } = req.body.measurement;

    db.run(`
        INSERT INTO Warning (
            stationary_unit_id, measurement_id, timestamp,
            ph_value, temperature_celsius, electric_conductivity,
            values_with_warnings
        )
        VALUES (
            $stationaryUnitID, $measurementID, $timestamp,
            $phValue, $tempC, $elecCond,
            $valuesWithWarnings
        )`,
        {
            $stationaryUnitID: stationaryUnitID,
            $measurementID: measurementID,
            $timestamp: timestamp,
            $phValue: phValue,
            $tempC: tempC,
            $elecCond: elecCond,
            $valuesWithWarnings: valuesWithWarnings
        }, 
        function(err) {
            if (err) {
                return console.log(err);
            }
            db.get(`
                SELECT *
                FROM Warning
                WHERE id = ${this.lastID};
                `, (err, newWarning) => {
                    err
                        ? next(err)
                        : console.log(`New warning: ${newWarning}`);
                }
            );          
        }
    );
}

measurementsRouter.post('/', checkForBlankInput, checkForWarning, createMeasurement, createWarning);

module.exports = measurementsRouter;