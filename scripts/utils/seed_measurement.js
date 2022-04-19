const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

const getTimestamp = require('./get_timestamp.js');
const getRandomRealNumber = require('./get_random_real_number.js');

const timestamp = getTimestamp();

// Get a random ph value between [4 and 11)
const phValue = getRandomRealNumber(4, 11, 1);

// Get a random Celsius temperature between [7 and 21)
const temperatureCelsius = getRandomRealNumber(7, 21, 2);

// Get a random EC value between [0.004 and 0.07)
const electricConductivity = getRandomRealNumber(0.004, 0.07, 3);

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
