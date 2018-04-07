const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

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

console.log(`Server started on ${appPort}`);