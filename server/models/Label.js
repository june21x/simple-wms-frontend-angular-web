const database = require('../database');
const { Model } = require('objection');

Model.knex(database);

class Label extends Model {

    static get tableName() {
        return 'Label';
    }
    
    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Order = require('./Order');
        const Crate = require('./Crate');

        return {
            order: {
                relation: Model.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'Label.shipment_id',
                    to: 'Order.id'
                }
            },
            crates: {
                relation: Model.HasManyRelation,
                modelClass: Crate,
                join: {
                    from: 'Label.id',
                    to: 'Crate.label_id'
                }
            }
        }
    }
}

module.exports = Label;