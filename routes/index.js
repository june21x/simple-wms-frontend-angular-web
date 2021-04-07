const express = require('express');
const router = express.Router();
const db = require('../server/queries');
const path = require('path')

router.get('/api/shipments', db.getIncomingShipments);
router.get('/api/shipments/:id', db.getSingleShipment);
router.post('/api/shipments', db.createShipment);
//router.put('/api/shipments/:id', db.updateShipment);
//router.delete('/api/shipments/:id', db.removeShipment);

router.get('/', function (req, res) {
    res.sendFile(path.resolve('../client/src/index.html', {root: __dirname}));
    // res.sendFile('../client/src/index.html', {root: __dirname});
});

module.exports = router;