const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./waterlab_database.sqlite');

const stationaryUnitRouter = express.Router();

stationaryUnitRouter.get('/:id', (req, res, next) => {
    const ID = req.params.id;

    db.get(`
        SELECT *
        FROM StationaryUnit
        WHERE id = $ID;
        `, { $ID: ID },
        (err, stationaryUnit) => {
            if (err) {
                next(err);
            }
            if (!stationaryUnit) {
                res.status(403).send('No stationary unit found!');                
            } else  {
                res.status(200).send({ stationaryUnit: stationaryUnit });
            }
        }
    );
});

// stationaryUnitRouter.get('/', (req, res, next) => {    
//     db.all(`
//         SELECT *
//         FROM StationaryUnit;
//         `, (err, stationaryUnits) => {
//             if (err) {
//                 next(err);
//             }
//             if (!stationaryUnits) {
//                 res.status(404).send('No stationary unit found!');                
//             } else  {
//                 res.status(200).send({ stationaryUnit: stationaryUnits });
//                 console.log(stationaryUnits);
//             }
//         }
//     );
// });

module.exports = stationaryUnitRouter;