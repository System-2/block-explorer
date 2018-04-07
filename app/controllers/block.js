const blockModel = require('./../models/blockModel');
const infoModel = require('./../models/infoModel');

exports.getBlocks = async (req, res) => {
    const blocks = await blockModel.getBlocks(
        req.params.count
    );
    
    let resBlocks = [],
        i = 0,
        blockTXProms = [];
    blocks.forEach(block => {
        blockTXProms[i++] = blockModel.getBlockTXs(block.id);
    });

    const currentTime = (await infoModel.getInfo()).currentTime;
    Promise.all(blockTXProms).then((blockTXs, err) => {
        if (!err) {
            i = 0;
            blocks.forEach(block => {
                resBlocks[i] = {
                    id: block.id,
                    height: block.height,
                    time: currentTime - block.timestamp,
                    bits: block.nBits,
                    txs: blockTXs[i++].length,
                    miner: block.votes
                }
            });

            res.send(resBlocks);
        }
    });
}

exports.getBlock = async (req, res) => {
    const blockInfo = await blockModel.getBlockInfo(
        req.params.headerId
    );

    let resBlockInfo = {
        id: blockInfo.header.id,
        height: blockInfo.header.height,
        time: blockInfo.header.timestamp,
        bits: blockInfo.header.nBits,
        nonce: blockInfo.header.nonce,
        parentId: blockInfo.header.parentId,  
        txs: blockInfo.blockTransactions,
        interlinks: blockInfo.header.interlinks
    }

    res.send(resBlockInfo);
}