const { Model } = require('../database');

class Order extends Model {

    static get tableName() {
        return 'Order';
    }

    static get idColumn() {
        return 'id';
    }

}

module.exports = {
    Order
}