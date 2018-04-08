const request = require('request-promise');
const url = require('./../../config').node;

exports.getBlocks = async count => {
    const reqUri = `${url}/blocks/lastHeaders/${count}`;

    let blocks = await request({
        uri: reqUri,
        json: true
    });

    return blocks;
}

exports.getBlockInfo = async headerId => {
    const reqUri = `${url}/blocks/${headerId}`;

    let blockInfoProm = new Promise((resolve, reject) => {
        resolve(
            request({
                uri: reqUri,
                json: true
            })
        );
    });

    return blockInfoProm;
}

exports.getBlockTXs = async headerId => {
    const reqUri = `${url}/blocks/${headerId}/transactions`;

    let blockTXs = new Promise((resolve, reject) => {
        resolve(
            request({
                uri: reqUri,
                json: true
            })
        );
    });

    return blockTXs;
}

exports.getBlockByHeight = async height => {
    let reqUri = `${url}/blocks/at/${height}`;

    let blockId = (await request({
        uri: reqUri,
        json: true
    }))[0];

    reqUri = `${url}/blocks/${blockId}`;
    let block = new Promise((resolve, reject) => {
        resolve(
            request({
                uri: reqUri,
                json: true
            })
        )
    });

    return block;
}