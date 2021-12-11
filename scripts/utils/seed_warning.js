const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('waterlab_database.sqlite');

const getTimestamp = require('./create_timestamp.js');
const getRandomRealNumber = require('./create_random_real_number.js');


const stationaryUnitID = 1;
const measurementID = 2;


const timestamp = getTimestamp();

//Get a random ph value between 6 and 7
const phValue = getRandomRealNumber(6, 8, 1);

//Get a random Celsius temperature between 12 and 19
const tempCelsius = getRandomRealNumber(12, 20, 2);

//Get a random EC value between 0.005 and 0.05
const elecCond = getRandomRealNumber(0.005, 0.051, 3);

const valuesWithWarnings = ['temperature_celsius', 'electric_conductivity'].toString();
// console.log(typeof)

const seedWarning = () => {
    db.run(`
        INSERT INTO Warning (
            stationary_unit_id, measurement_id, timestamp,
            ph_value, temperature_celsius, electric_conductivity,
            values_with_warnings
        )
        VALUES (
            $stationaryUnitID, $measurementID, $timestamp,
            $phValue, $tempCelsius, $elecCond,
            $valuesWithWarnings
        )`,
        {
            $stationaryUnitID: stationaryUnitID,
            $measurementID: measurementID,
            $timestamp: timestamp,
            $phValue: phValue,
            $tempCelsius: tempCelsius,
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
                        ? console.log(err)
                        : console.log(newWarning);
                }
            );          
        }
    );
}

seedWarning();