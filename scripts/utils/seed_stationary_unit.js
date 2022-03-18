const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

// One Stationary Unit with ID 1 has already been created !!!
db.run(`
    INSERT INTO StationaryUnit
        (unit_name, interval_execute_measurement,
         limit_ph_minimum, limit_ph_maximum,
         limit_temp_minimum, limit_temp_maximum,
         limit_ec_minimum, limit_ec_maximum)
    VALUES
        ($unitName, $intervalExecMeas,
         $limitPhMin, $limitPhMax,
         $limitTempMin, $limitTempMax,
         $limitEcMin, $limitEcMax);
    `,
    {
        $unitName: 'WaterLab PoC',
        $intervalExecMeas: 12,
        $limitPhMin: 6.0,
        $limitPhMax: 7.0,
        $limitTempMin: 12.0,
        $limitTempMax: 20.0,
        $limitEcMin: 0.005,
        $limitEcMax: 0.051
    },
    function(err) {
        if (err) {
            return console.log(err);
        }
        db.get(`
            SELECT *
            FROM StationaryUnit
            WHERE id = ${this.lastID};
            `, (err, newUnit) => {
                err
                    ? console.log(err)
                    : console.log(newUnit);
            }
        );
    }
);

// db.run(`
//     ALTER TABLE StationaryUnit
//     RENAME COLUMN x TO y;
//     `,
// // RENAME COLUMN warning_ph_minimum TO limit_ph_minimum;
// // RENAME COLUMN warning_ph_maximum TO limit_ph_maximum;
// // RENAME COLUMN warning_temp_minimum TO limit_temp_minimum;
// // RENAME COLUMN warning_temp_maximum TO limit_temp_maximum;
// // RENAME COLUMN warning_ec_minimum TO limit_ec_minimum;
// // RENAME COLUMN warning_ec_maximum TO limit_ec_maximum;
// );