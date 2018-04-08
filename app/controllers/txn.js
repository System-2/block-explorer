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

    res.json(response);
}

exports.getAllView = async (req, res) => {
    let limit = 20,
        page = 1,
        response = await txnModel.getTxns(limit, page);
        
    res.render('txns.html', {txns: response, page: page});
}

exports.getView = async (req, res) => {
    let id = req.params.id,
        blockId = req.params.block,
        response = await txnModel.getTxn(id, blockId);
        
    res.render('txn.html', {txn: response});
}