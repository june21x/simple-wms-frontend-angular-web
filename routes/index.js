var express = require("express");
var router = express.Router();

var OrderAPIs = require('../server/api/Orders');

//test
router.get('/orders', OrderAPIs.getAllOrders);

module.exports = router;
