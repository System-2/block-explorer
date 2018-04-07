const node = require('./../../config').node;
const request = require('request-promise');

exports.getTxns = async (limit, page, long) => {
    let nodeInfo = await request({
        url: `${node}/info`,
        json: true
    }),

    skip = nodeInfo.headersHeight - Math.round(nodeInfo.headersHeight/limit)*page + 1,
    headers = await request({
        url: `${node}/blocks?limit=${limit}&offset=${skip}`,
        json: true
    }),
    promisess = [];

    for(let i=0; i<headers.length; i++){
        promisess[i] = new Promise( async (resolve, reject) => {
            request({
                    url: `${node}/blocks/${headers[i]}/transactions`,
                    json: true
                }).then( async result => {
                    result.map(tx => {
                        tx.block = headers[i]; 
                    });                
                    resolve(result);
                    
                });  
        });
    }

    return Promise.all(promisess).then((result, err) => {
        let mass = [];
        for (let i=0; i<result.length; i++){
            mass[i] = {
                txn: result[i][0].id,
                block: result[i][0].block,
                from: result[i][0].inputs[0].id,
                to: result[i][0].outputs[0].id,
                value: result[i][0].outputs[0].value
            } 
        }
        return(mass);
    });
}

exports.getTxn = async (id, blockId) => {    
    let blockTrans = await request(`/blocks/${blockId}/transactions`),
        result = blockTrans.find( block => block.id == id);
    return result;
}