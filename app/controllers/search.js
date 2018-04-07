const blockModel = require('./../models/blockModel');
const txnModel = require('./../models/txnModel');
const helpModel = require('./../models/helpModel');

exports.search = async (req, res) => {
    const hash = req.body.hash;

    let response;
    switch (hash.length) {
        case 43:
            try {
                response = helpModel.formBlockData(await blockModel.getBlockInfo(hash));
            } catch (e) {
                res.send('Block not found.');

                return;
            }

            break;

        case 44:
            response = 'transaction info...';

            break;
    }

    res.send(response);
}