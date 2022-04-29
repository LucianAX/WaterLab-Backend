const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

let flag = 3;
db.serialize(function() {
    

    db.get (`SELECT *
        FROM Measurement
        WHERE id = 30;
        `, (err, mm) => {
            if (err) {
                console.log(err);
            } else {
                flag = 7;
            }
        }
    );
    db.get (`
        SELECT *
        FROM Warning
        WHERE id = 1;
        `, (err, wng) => {
            if (err) {
                console.log(err);
            } else {
               flag = 10;
            }
        }
    );
    
})

console.log(`final flag: ${flag}`);

db.close();