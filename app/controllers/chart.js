const statsModel = require('./../models/statsModel');
const config = require('./../../server').config;

exports.getDiffStats = async (req, res) => {
    const limit = Number(req.params.limit);
    const difficulties = await statsModel.getDiffStats(limit);

    res.send(difficulties);
}

exports.tranasctionsInfo = async (req, res) => {
    let limit = req.params.limit,
        response = await statsModel.transOnBlocks(limit, config.url, config.dbName);
    res.json(response);
}

exports.txnChart = (req, res) =>{
    res.render('chart.html');
}