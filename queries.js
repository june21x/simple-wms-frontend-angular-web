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
    db.any('SELECT * FROM "Shipment"').then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved all shipments'
        });
    }).catch(function (error) {
        return next(error);
    })
}

function getSingleShipment(req, res, next) {
    var shipmentID = parseInt(req.params.id);
    db.one('SELECT * FROM Shipment WHERE ID = $1', shipmentID).then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved shipment from ID'
        });
    }).catch(function (error) {
        return next(error);
    })
}

function createShipment(req, res, next) {
    db.none('INSERT INTO Shipment(delivery_method, type, tracking' + 'values(${delivery_method}, ${type}, ${tracking})', req.body).then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Inserted a shipment'
        });
    }).catch(function (error) {
        return next(error);
    })
}

module.exports = {
    getIncomingShipments: getIncomingShipments,
    getSingleShipment: getSingleShipment,
    createShipment: createShipment
}