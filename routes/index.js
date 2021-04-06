const express = require('express');
// const path = require('path')
//const app = require('../app');
const router = express.Router();
var db = require('../queries');


router.get('/api/shipments', db.getIncomingShipments);
router.get('/api/shipments/:id', db.getSingleShipment);
router.post('/api/shipments', db.createShipment);
//router.put('/api/shipments/:id', db.updateShipment);
//router.delete('/api/shipments/:id', db.removeShipment);

router.get('/', function (req, res) {
    // router.use(express.static(path.join(__dirname, 'public')));
    // router.set('views', path.join(__dirname, 'views'));
    // router.set('view engine', 'ejs');
    res.render('../views/pages/home');
})