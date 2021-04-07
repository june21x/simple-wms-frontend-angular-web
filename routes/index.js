var express = require('express');
var router = express.Router();
var db = require('../server/queries');

router.get('/api/shipments', db.getIncomingShipments);
router.get('/api/shipments/:id', db.getSingleShipment);
router.post('/api/shipments', db.createShipment);
//router.put('/api/shipments/:id', db.updateShipment);
//router.delete('/api/shipments/:id', db.removeShipment);

router.get('/', function (req, res) {
    res.sendFile('../client/src/index.html', {root: __dirname});
});

module.exports = router;