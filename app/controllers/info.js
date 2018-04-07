let request = require('request-promise');

exports.getInfo = async (req, res) => {
    let url = `http://localhost:9051/info`;

    let testReq = await request({
        url: url,
        json: true
    });

    res.send(`${testReq.currentTime}`);
}