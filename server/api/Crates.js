const Crates = require('../models/Crate');

async function getAllCrates(req, res, next) {
    try {
        const crates = await Crates.query();
        res.status(200).json({
            status: 'success',
            data: crates,
            message: 'Retrieved all the crates!'
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    getAllCrates
}