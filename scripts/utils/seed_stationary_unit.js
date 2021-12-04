const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

// One Stationary Unit with ID 1 has already been created

// db.run(`
//     INSERT INTO StationaryUnit
//         (unit_name, interval_execute_measurement,
//          warning_ph_minimum, warning_ph_maximum,
//          warning_temp_minimum, warning_temp_maximum,
//          warning_ec_minimum, warning_ec_maximum)
//     VALUES
//         ($unitName, $intervalExecMeas,
//          $warningPhMin, $warningPhMax,
//          $warningTempMin, $warningTempMax,
//          $warningEcMin, $warningEcMax);
//     `,
//     {
//         $unitName: 'WaterLab PoC',
//         $intervalExecMeas: 12,
//         $warningPhMin: 6.0,
//         $warningPhMax: 7.0,
//         $warningTempMin: 12.0,
//         $warningTempMax: 20.0,
//         $warningEcMin: 0.005,
//         $warningEcMax: 0.051
//     },
//     function(err) {
//         if (err) {
//             return console.log(err);
//         }
//         db.get(`
//             SELECT *
//             FROM StationaryUnit
//             WHERE id = ${this.lastID};
//             `, (err, newUnit) => {
//                 err
//                     ? console.log(err)
//                     : console.log(newUnit);
//             }
//         );
//     }
// );