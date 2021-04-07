const { Model } = require('objection');

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