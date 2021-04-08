//const { Model, Knex } = require('../database');
var Order = require('../models/Order');

async function getAllOrders(req, res, next) {
    try {

        // TODO: 'Order' is STILL undefined.... why
        const orders = await Order.query();
        res.status(200).json({
            status: 'success',
            data: orders,
            message: 'Retrieved all orders'
        });
    } catch(error) {
        return next(error);
    }
}

module.exports = {
    getAllOrders
}