const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('waterlab_database.sqlite');

/**** helper function for inserting values into Warning table  ****/
const insertWarning = (mm) => {
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
            $timestamp: mm.timestamp,
            $phValue: mm.phValue,
            $tempC: mm.tempC,
            $elecCond: mm.elecCond,
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
                        ? console.log(err)
                        : console.log(newWarning);
                }
            );          
        }
    );
}



/*** Picking random measurement, retrieving fields and randomly creating the values with warnings field */

const getRandomWarningsArray = require('./get_random_warnings_array.js');

const stationaryUnitID = 1;
let measurementID;
let timestamp, phValue, tempC, elecCond;

const valuesArray = ['ph_value', 'temperature_celsius', 'electric_conductivity'];
const valuesWithWarnings = getRandomWarningsArray(valuesArray).toString();
console.log(valuesWithWarnings);

const seedWarning = () => {
    db.all(`
        SELECT *
        FROM Measurement;
        `, (err, allMeasurements) => {
            if (err) {
                return console.log(err);
            }

            // pick random measurement ID
            nrOfMeasurements = allMeasurements.length;
            measurementID = Math.floor(Math.random() * nrOfMeasurements) + 1;
            console.log(measurementID);

            db.get(`
                SELECT *
                FROM Measurement
                WHERE id = ${measurementID};
                `, (err, foundMeas) => {
                    if (err) {
                        return console.log(err);
                    }

                    //transfer values of fields from picked measurement
                    const mmObj = {
                        timestamp: foundMeas.timestamp,
                        phValue: foundMeas.ph_value,
                        tempC: foundMeas.temperature_celsius,
                        elecCond: foundMeas.electric_conductivity,
                    } 
                    
                    insertWarning(mmObj);
                }
            );
        }
    );
}

seedWarning();