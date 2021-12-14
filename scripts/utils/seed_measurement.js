const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

const getTimestamp = require('./get_timestamp.js');
const getRandomRealNumber = require('./get_random_real_number.js');

const timestamp = getTimestamp();

//Get a random ph value between 6 and 7
const phValue = getRandomRealNumber(6, 8, 1);

//Get a random Celsius temperature between 12 and 19
const temperatureCelsius = getRandomRealNumber(12, 20, 2);

//Get a random EC value between 0.005 and 0.05
const electricConductivity = getRandomRealNumber(0.005, 0.051, 3);

// let hasWarning = 'true';
let hasWarning = 'false';

db.run(`
    INSERT INTO Measurement
        (timestamp, ph_value, temperature_celsius, electric_conductivity, stationary_unit_id, has_warning)
    VALUES
        ($timestamp, $phValue, $tempC, $elecCond, $stationaryUnitID, $hasWarning);
    `,
    {
        $timestamp: timestamp,
        $phValue: phValue,
        $tempC: temperatureCelsius,
        $elecCond: electricConductivity,
        $stationaryUnitID: 1,
        $hasWarning: hasWarning
    },
    function(err) {
        if (err) {
            return console.log(err);
        }
        db.get(`
            SELECT *
            FROM Measurement
            WHERE id = ${this.lastID};
            `, (err, newMeasurement) => {
                err
                    ? console.log(err)
                    : console.log(newMeasurement);
            }
        );
    }
);
