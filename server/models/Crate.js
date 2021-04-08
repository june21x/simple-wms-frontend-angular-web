const database = require('../database');
const { Model } = require('objection');

Model.knex(database);

class Crate extends Model {

    static get tableName() {
        return 'Crate';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Label = require('./Label');
        const Pallet = require('./Pallet');

        return {
            label: {
                relation: Model.BelongsToOneRelation,
                modelClass: Label,
                join: {
                    from: 'Crate.label_id',
                    to: 'Label.id'
                }
            },
            pallet: {
                relation: Model.BelongsToOneRelation,
                modelClass: Pallet,
                join: {
                    from: 'Crate.pallet_id',
                    to: 'Pallet.id'
                }
            }
        }
    }
}

module.exports = Crate;