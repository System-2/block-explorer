const statsModel = require('./../models/statsModel');
const config = require('./../../server').config;

exports.tranasctionsInfo = async (req, res) => {
    let limit = req.params.limit,
        response = await statsModel.transOnBlocks(limit, config.url, config.dbName);
    res.json(response);
}