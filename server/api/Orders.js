//const { Model, Knex } = require('../database');
var database = require('../database');
//const OrderModel = require('../models/Order');
import { Order } from ('../models/Order');

async function getAllOrders(req, res, next) {
    try {
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