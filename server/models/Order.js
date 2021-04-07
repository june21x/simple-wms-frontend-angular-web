var database = require('../database');

class Order extends database.ObjectionModel {

    static get tableName() {
        return 'Order';
    }

    static get idColumn() {
        return 'id';
    }

}

export { Order };