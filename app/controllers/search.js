const blockModel = require('./../models/blockModel');
const txnModel = require('./../models/txnModel');
const helpModel = require('./../models/helpModel');

exports.search = async (req, res) => {
    const hash = req.body.hash;
    let response;

    try {
        if (Number(hash) != NaN) {
            response = helpModel.formBlockData(
                await blockModel.getBlockByHeight(hash)
            );
        } else {
            response = helpModel.formBlockData(
                await blockModel.getBlockInfo(hash)
            );
        }
    } catch (e) {
        response = 'Block not found.';
    }

    res.send(response);
}