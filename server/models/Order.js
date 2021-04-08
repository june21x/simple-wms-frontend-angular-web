const database = require('../database');
const { Model } = require('objection');

Model.knex(database);

class Order extends Model {

    static get tableName() {
        return 'Order';
    }

    static get idColumn() {
        return 'id';
    }

}

module.exports = Order;