var express = require("express");
var router = express.Router();
var db = require('../server/queries');


var ctrlTestCrypto = require("../controllers/test.controller");

//test
router.get('/shipments', db.getIncomingShipments);

// router
//   .route("/test")
//     .get(ctrlTestCrypto.testTestCrypto)

module.exports = router;
