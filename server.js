const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const statModel = require('./app/models/statsModel');

let login = require('./config').dbLogin,
    pass = require('./config').dbPass,
    address = require('./config').dbAddress,
    dbName = require('./config').dbName,
    dbPort = require('./config').dbPort,
    appPort = require('./config.js').port,
    prodaction = require('./config').prodaction,
    url = `mongodb://${address}:${dbPort}/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});
module.exports.mongoose = mongoose;

app.use(
    express.static(__dirname + '/src'),
    bodyParser()
);

app.use('/api/v1/', require('./router'));
app.listen(appPort);

(async() => {
    if (prodaction) {
        setTimeout(function rec(){
            statModel.synch(url);
            setTimeout(rec, 60000);
        });
    }
    else {
        await statModel.getAllHeaders(url);
        await statModel.getAllBlocks(url);
    }
})();

console.log(`Server started on ${appPort}`);