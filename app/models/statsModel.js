const mongoClient = require('mongodb').MongoClient;
const request = require('request-promise');
const node = require('./../../config').node;

exports.synch = async url => {
    let nodeInfo = await request({
        url: `${node}/info`,
        json: true
    });

    mongoClient.connect(url, async (err, db) => {
        let miners = await db.collection('miners').find().sort({height: 1}).toArray();
        console.log(miners);
        if (miners[miners.length-1].height != 0) {
            forSynch = nodeInfo.height - miners[miners.length-1].height;
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
            db.collection('miners').insert(result[i]);
        }
    });
}