var express = require("express");
var router = express.Router();
var db = require('../server/database');


var ctrlTestCrypto = require("../controllers/test.controller");

//test
router.get('/orders', db.getAllOrders);

// router
//   .route("/test")
//     .get(ctrlTestCrypto.testTestCrypto)

module.exports = router;
