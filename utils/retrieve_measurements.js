// const sqlite3 = require('sqlite3');
// const db = new sqlite3.Database('./waterlab_database.sqlite');

let retrievedRows = '';
// let newRow = '';

db.all(`
    SELECT *
    FROM Measurements;
    `, (err, rows) => {
        err ? console.log(err) : 1;
        // console.log(rows[1]);
        rows.forEach(row => {
            retrievedRows += `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.timestamp}</td>
                    <td>${row.ph_value}</td>
                    <td>${row.temperature_celsius}</td>
                    <td>${row.electric_conductivity}</td>
                </tr>
            `;
            // console.log(`Rows now: ${retrievedRows}`);
        });
        
        
        console.log(`Rows finally: ${typeof retrievedRows}`);
        // retrievedRows = `<button style="background: red">Alien element</button>`;
        module.exports = retrievedRows;        
    }
);