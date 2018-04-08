const mongoClient = require('mongodb').MongoClient;
const request = require('request-promise');
const config = require('./../../config');
const node = config.node;
const blockModel = require('./../models/blockModel');
const dbUrl = `mongodb://${config.dbAddress}:${config.dbPort}`;
const dbName = config.dbName;

exports.synch = async url => {
    let nodeInfo = await request({
        url: `${node}/info`,
        json: true
    });

    mongoClient.connect(url, async (err, client) => {
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

    for(let i=0, j=0; i<nodeInfo.headersHeight; i+=1000, j++){
        promises[j] = new Promise((resolve, reject) => {
            resolve(
                request({
                    url: `${node}/blocks?limit=1000&offset=${i}`,
                    json: true
                })
            );
        });
    }

    Promise.all(promises).then( result => {
        let blocks = [].concat.apply([], result);
        blocks = blocks.slice(-500);s

        mongoClient.connect(url, async (err, db) => {
            db = db.db(dbName);

            let timeout = 0;
            blocks.forEach(async block => {
                setTimeout(async () => {
                    const blockInfo = await blockModel.getBlockInfo(block);
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
            mongoClient.connect(url, async (err, client) => {
                const db = client.db(dbName);
                await db.collection('blocks').insertOne(blocks);
            });
        });
    });
}

exports.getDiffStats = async (limit) => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(dbUrl, async (err, db) => {
            db = db.db(dbName);
    
            const blocks = await db.collection('blocks').find().sort({_id: -1}).limit(limit).toArray();
            
            let difficulties = [];
            blocks.forEach(block => {
                difficulties.push(block.header.difficulty);
            });
            
            return resolve(difficulties);
        })
    })
}

exports.transOnBlocks = async (limit, url, dbName) => {
    return new Promise ((res, rej) => {
            mongoClient.connect(url, async (err, client) => {
            const db = client.db(dbName);

            let blocks = await db.collection('blocks').find().sort({_id: -1}).limit(Number(limit)).toArray(),
                stat = [];
            blocks.map( block => {
                let isNone = true;
                for (i=0; i<stat.length; i++){
                    if (stat[i]['items'] == block.blockTransactions.transactions.length){
                        ++stat[i]['count'];
                        isNone = false;
                        break;
                    }
                }
                if (isNone) {
                    stat[stat.length] = {
                        items: block.blockTransactions.transactions.length,
                        count: 1
                    }
                }  
            });
            stat.sort((a,b) => {
                return b.items - a.items
            })
            for (i=stat.length-1; i>0; i--){
                for(j = (stat[i-1].items-1); (stat[i-1].items-1)!=stat[i].items; --j, i++){
                    stat.splice(i,0, {
                        items: j,
                        count: 0
                    });
                }
            }
            res(stat);
        });
    });
}