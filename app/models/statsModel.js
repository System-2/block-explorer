const mongoClient = require('mongodb').MongoClient;
const request = require('request-promise');
const node = require('./../../config').node;
const blockModel = require('./../models/blockModel');

exports.synch = async url => {
    let nodeInfo = await request({
        url: `${node}/info`,
        json: true
    });

    mongoClient.connect(url, async (err, client) => {
        console.log(db);
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

exports.getAllHeaders = async (url, dbName) => {
    let nodeInfo = await request({
            url: `${node}/info`,
            json: true
        }),
        promises = [],
        blocksObj = [];

    for(let i=0, j=0; i<500; i+=100, j++){
        promises[j] = new Promise((resolve, reject) => {
            resolve(
                request({
                    url: `${node}/blocks?limit=100&offset=${i}`,
                    json: true
                })
            );
        });
    }

    Promise.all(promises).then( result => {
        let blocks = [].concat.apply([], result);

        mongoClient.connect(url, async (err, db) => {
            db = db.db(dbName);
            console.log(blocks);

            let blockInfoProm = [],
                i = 0,
                timeout = 0;
            blocks.forEach(async block => {
                setTimeout(async () => {
                    const blockInfo = await blockModel.getBlockInfo(block);
                    console.log(blockInfo);
                    await db.collection('blocks').insertOne(blockInfo);
                }, timeout);
                timeout += 100;
            });
        });
    });
}

exports.getAllBlocks = async (url, dbName) => {
    let headers,
        promises = [];

    mongoClient.connect(url, async (err, client) => {
        const db = client.db(dbName);

        headers = (await db.collection('headers').findOne()).blocks;

        for (let i = 0; i < headers.length; i++){
            promises[i] = new Promise((resolve, reject) => {
                resolve(
                    request({
                        uri: `${node}/blocks/${headers[i]}`,
                        json: true
                    })
                )
            });
        }

        Promise.all(promises).then( blocks => {
            console.log(blocks);
            mongoClient.connect(url, async (err, client) => {
                const db = client.db(dbName);
                console.log(blocks);
                await db.collection('blocks').insertOne(blocks);
            });
        });
    });
}