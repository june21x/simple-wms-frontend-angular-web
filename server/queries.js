var promise = require('bluebird');

var options = {     // required, overrides default express's promise with bluebird library
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
let ssl = null;
    ssl = {rejectUnauthorized: false};

const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: ssl
}

const db = pgp(config);




function getIncomingShipments(req, res, next) {
    db.any('SELECT * FROM "Order"').then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved all shipments'
        });
    }).catch(function (error) {
        return next(error);
    })
}

module.exports = {
    getIncomingShipments: getIncomingShipments,
}