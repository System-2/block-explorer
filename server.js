const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const statModel = require('./app/models/statsModel');

let login = require('./config').dbLogin,
    pass = require('./config').dbPass,
    adress = require('./config').dbAdress,
    dbName = require('./config').dbName,
    dbPort = require('./config').dbPort,
    appPort = require('./config.js').port
    url = `mongodb://${adress}:${dbPort}/${dbName}`;

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});
module.exports.mongoose = mongoose;

app.use(
    express.static(__dirname + '/src'),
    bodyParser()
);

app.use('/api/v1/', require('./router'));
app.listen(appPort);

setTimeout(function rec(){
    statModel.synch();
    setTimeout(rec, 60000);
});

console.log(`Server started on ${appPort}`);