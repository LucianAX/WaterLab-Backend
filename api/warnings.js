const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('waterlab_database.sqlite');

const warningsRouter = express.Router();

warningsRouter.get('/', (req, res, next) => {
    db.all(`
        SELECT *
        FROM Warning
        ORDER BY timestamp DESC;
        `, (err, allWarnings) => {
            err
                ? next(err)
                : res.status(200).send({ warnings: allWarnings });
        });
});

module.exports = warningsRouter;