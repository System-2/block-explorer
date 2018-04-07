const mongoClient = require('mongodb').MongoClient;
const request = require('request-promise');
const node = require('./../../config').node;

exports.synch = async url => {
    let nodeInfo = await request({
        url: `${node}/info`,
        json: true
    });

    mongoClient.connect(url, async (err, db) => {
        let blocks = await db.collection('blocks').find().sort({height: 1}).toArray();

        if (blocks[blocks.length-1].height != 0) {
            forSynch = nodeInfo.height - blocks[blocks.length-1].height;
            updateDB(forSynch, url)
        }
    });
} 

async function updateDB(forSynch, url){
    let result = await request({
        url: `${node}/blocks/lastHeaders/${forSynch}`,
        json: true
    });

    mongoClient.connect(url, (err, db) => {
        for(let i=0; i<result.length; i++){
            db.collection('blocks').insert(result[i]);
        }
    });
}

exports.getAllHeaders = async (url) => {
    let nodeInfo = await request({
            url: `${node}/info`,
            json: true
        }),
        promisess = [],
        blocks = [];

    for(let i=0, j=0; i<nodeInfo.headersHeight; i+=100, j++){
        promisess[j] = new Promise((resolve, reject) => {
            resolve(
                request({
                    url: `${node}/blocks?limit=100&offset=${i}`,
                    json: true
                })
            );
        });
    }

    Promise.all(promisess).then( result => {
        for(let i=0; i<result.length; i++){
            blocks = blocks.concat(i);
        }

        mongoClient.connect(url, (err, db) => {
            db.collection('headers').insert(blocks);
        });
    });
}

exports.getAllBlocks = async (url) => {
    let headers,
        promisess = [];
    mongoClient.connect(url, async (err, db) => {
        headers = await db.collection('headers').findOne()     
    });

    for (let i=0; i<headers; i++){
        promisess[i] = new Promise((resolve, reject) => {
            resolve(
                request({
                    url: `${node}/blocks/${item}`,
                    json: true
                })
            )
        });
    }

    Promise.all(promisess).then( blocks => {
        mongoClient.connect(url, (err, db) => {
            db.collection('blocks').insert(blocks);
        });
    });
}