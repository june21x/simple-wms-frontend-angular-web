var express = require('express');
var router = express.Router();
var db = require('../queries');

router.get('/api/shipments', db.getIncomingShipments);
router.get('/api/shipments/:id', db.getSingleShipment);
router.post('/api/shipments', db.createShipment);
//router.put('/api/shipments/:id', db.updateShipment);
//router.delete('/api/shipments/:id', db.removeShipment);

router.get('/', function (req, res) {
    res.render('home')
});

module.exports = router;