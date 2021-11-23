const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Measurements',
        (err) => err ? console.log(err) : 1
    );
    db.run('DROP TABLE IF EXISTS StationaryUnits',
        (err) => err ? console.log(err) : 1
    );
    db.run('DROP TABLE IF EXISTS MeasurementWarnings',
        (err) => err ? console.log(err) : 1
    );

    db.run(`
        CREATE TABLE Measurements (
            id INTEGER PRIMARY KEY NOT NULL,
            timestamp TEXT NOT NULL,
            ph_value REAL NOT NULL,
            temperature_celsius REAL NOT NULL,
            electric_conductivity REAL NOT NULL
        );`,
        (err) => err ? console.log(err) : 1
    );
    db.run(`
        CREATE TABLE StationaryUnits (
            id INTEGER PRIMARY KEY NOT NULL,
            unit_name TEXT NOT NULL,
            interval_execute_measurement INTEGER NOT NULL,
            warning_ph_minimum REAL NOT NULL,
            warning_ph_maximum REAL NOT NULL,
            warning_temp_minimum REAL NOT NULL,
            warning_temp_maximum REAL NOT NULL,
            warning_ec_minimum REAL NOT NULL,
            warning_ec_maximum REAL NOT NULL
        );`,
        (err) => err ? console.log(err) : 1
    );
    db.run(`
        CREATE TABLE MeasurementWarnings (
            id INTEGER PRIMARY KEY NOT NULL,
            stationary_unit_id INTEGER NOT NULL,
            measurement_id INTEGER NOT NULL,
            timestamp TEXT NOT NULL,
            ph_value REAL NOT NULL,
            temp_celsius_value REAL NOT NULL,
            ec_value REAL NOT NULL,
            values_with_warnings TEXT NOT NULL,
            FOREIGN KEY (stationary_unit_id) REFERENCES StationaryUnits (id),
            FOREIGN KEY (measurement_id) REFERENCES Measurements (id)
        );`,
        (err) => err ? console.log(err) : 1
    );
});