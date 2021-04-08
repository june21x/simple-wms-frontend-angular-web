var express = require("express");
var router = express.Router();

var OrderAPIs = require('../server/api/Orders');
var CrateAPIs = require('../server/api/Crates');
var LabelAPIs = require('../server/api/Labels');

//test
router.get('/orders', OrderAPIs.getAllOrders);
router.get('/crates', CrateAPIs.getAllCrates);
router.get('/label', LabelAPIs.getAllLabels);

module.exports = router;
