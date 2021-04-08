const database = require('../database');
const { Model } = require('objection');

Model.knex(database);

class Vendor extends Model {

    static get tableName() {
        return 'Order';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Order = require('./Order');

        return {
            order: {
                relation: Model.HasOneRelation,
                modelClass: Order,
                join: {
                    from: 'Vendor.id',
                    to: 'Order.vendor_id'
                }
            }
        }
    }
}

module.exports = Vendor;