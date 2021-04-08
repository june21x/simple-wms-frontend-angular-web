//const { Model, Knex } = require('../database');
const Order = require('../models/Order');

async function getAllOrders(req, res, next) {
    try {

        // TODO: 'Order' is STILL undefined.... why
        const orders = await Order.query();
        res.status(200).json({
            status: 'success',
            data: orders,
            message: 'Retrieved all orders'
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    getAllOrders
}