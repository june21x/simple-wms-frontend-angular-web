const database = require('../database');
const { Model } = require('objection');

Model.knex(database);

class Pallet extends Model {

    static get tableName() {
        return 'Pallet';
    }

    static get idColumn() {
        return 'id';
    }

    // Possible To-Do: Create JSON Schema for validation

    static get relationMappings() {
        const Crate = require('./Crate');

        return {
            crates: {
                relation: Model.HasManyRelation,
                modelClass: Crate,
                join: {
                    from: 'Pallet.id',
                    to: 'Crate.pallet_id'
                }
            }
        }
    }
}

module.exports = Pallet;