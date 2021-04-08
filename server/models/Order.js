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

    // Possible To-Do: Create JSON Schema for validation

    static get relationMappings() {
        const Label = require('./Label');
        const Transaction = require('./Transaction');
        const Vendor = require('./Vendor');

        return {
            label: {
                // Each shipment order will have one unique label.
                relation: Model.HasOneRelation,
                modelClass: Label,
                join: {
                    from: 'Order.id',
                    to: 'Label.shipment_id'
                }
            },
            transaction: {
                relation: Model.BelongsToOneRelation,
                modelClass: Transaction,
                join: {
                    from: 'Order.transaction_id',
                    to: 'Transaction.id'
                }
            },
            vendor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vendor,
                join: {
                    from: 'Order.vendor_id',
                    to: 'Vendor.id'
                }
            }
        }
    }
}

module.exports = Order;