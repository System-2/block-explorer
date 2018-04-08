const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const statModel = require('./app/models/statsModel');

let login = require('./config').dbLogin,
    pass = require('./config').dbPass,
    address = require('./config').dbAddress,
    dbName = require('./config').dbName,
    dbPort = require('./config').dbPort,
    appPort = require('./config.js').port,
    production = require('./config').production,
    url = `mongodb://${address}:${dbPort}`;

module.exports.config = {url, dbName}

app.use(
    function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    },
    express.static(__dirname + '/src'),
    bodyParser()
);

app.use('/api/v1/', require('./router'));
app.listen(appPort);

(async() => {
    if (production) {
        setTimeout(function rec(){
            statModel.synch(url);
            setTimeout(rec, 60000);
        });
    }
    else {
        // await statModel.getAllHeaders(url, dbName);
        // await statModel.getAllBlocks(url, dbName);
    }
})();

console.log(`Server started on ${appPort}`);