const txnModel = require('./../models/txnModel');

exports.getLimitTxns = async (req, res) => {
    let limit = req.params.limit,
        page = req.params.page,
        response = await txnModel.getTxns(limit, page);

    res.json(response);
}

exports.getTxn = async (req, res) => {
    let id = req.params.id,
        blockId = req.params.blockId,
        response = await txnModel.getTxn(id, blockId);

    res.json(JSON.parse(response));
}