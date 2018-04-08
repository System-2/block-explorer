const blockModel = require('./../models/blockModel');
const infoModel = require('./../models/infoModel');

exports.getMainPage = async (req, res) => {
    const blocks = await blockModel.getBlocks(
        30
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

            res.render('index.html', {
                blocks: resBlocks.reverse()
            });
        }
    });
}