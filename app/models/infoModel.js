const request = require('request-promise');
const url = require('./../../config').node;

exports.getInfo = async () => {
    const reqUri = `${url}/info`;

    let info = await request({
        uri: reqUri,
        json: true
    });

    return info;
}