const Labels = require('../models/Label');

async function getAllLabels(req, res, next) {
    try {
        const labels = await Labels.query();
        res.status(200).json({
            status: 'success',
            data: labels,
            message: 'Retrieved all the labels!'
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    getAllLabels
}