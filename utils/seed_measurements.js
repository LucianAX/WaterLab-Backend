const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

const timestamp = require('./create_timestamp.js');

// Returns a random number between min (included) and max (not included) with the desired no. of floating decimals
const getRandomRealNumber = (min, max, desiredDecimals) => {
    let longDigitsVal = Math.random() * (max - min) + min;
    return Number(longDigitsVal.toFixed(desiredDecimals));
}

//Get a random ph value between 6 and 7
const phValue = getRandomRealNumber(6, 8, 1);

//Get a random Celsius temperature between 12 and 19
const temperatureCelsius = getRandomRealNumber(12, 20, 2);

//Get a random EC value between 0.005 and 0.05
const electricConductivity = getRandomRealNumber(0.005, 0.051, 3);

db.run(`
    INSERT INTO Measurements
        (timestamp, ph_value, temperature_celsius, electric_conductivity)
    VALUES
        ($timestamp, $phValue, $temperatureCelsius, $electricConductivity);
    `,
    {
        $timestamp: timestamp,
        $phValue: phValue,
        $temperatureCelsius: temperatureCelsius,
        $electricConductivity: electricConductivity
    },
    (err, row) => {
        err ? console.log(err) : 1;
    }
);

db.get(`SELECT * FROM Measurements WHERE id = 1;`, (err, row) => {
    err ? console.log(err) : console.log(row);
})