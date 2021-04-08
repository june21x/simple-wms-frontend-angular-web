const database = require('../database');
const { Model } = require('objection');

Model.knex(database);

class Transaction extends Model {

    static get tableName() {
        return 'Transaction';
    }
    
    static get idColumn() {
        return 'id';
    }

    static get RelationMappings() {
        const Order = require('./Order');

        return {
            order: {
                relation: Model.HasOneRelation,
                modelClass: Order,
                join: {
                    from: 'Transaction.id',
                    to: 'Order.transaction_id'
                }
            }
        }
    }
}

module.exports = Transaction;