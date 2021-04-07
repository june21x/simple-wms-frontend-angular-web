const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
});

Model.knex(knex);

module.exports = Model










// async function getAllOrders(req, res, next) {
//     try {
//         const orders = await Order.query();
//         res.status(200).json({
//             status: 'success',
//             data: orders,
//             message: 'Retrieved all orders'
//         });
//     } catch(error) {
//         return next(error);
//     }
// }

// function getIncomingShipments(req, res, next) {
//     db.any('SELECT * FROM "Order"').then(function (data) {
//         res.status(200).json({
//             status: 'success',
//             data: data,
//             message: 'Retrieved all shipments'
//         });
//     }).catch(function (error) {
//         return next(error);
//     })
// }

// module.exports = {
//     getAllOrders, getAllOrders,
// }