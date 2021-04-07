//const { Model, Knex } = require('../database');
var database = require('../database');

async function getAllOrders(req, res, next) {
    try {
        const orders = await database.ObjectionModel.Order.query();
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