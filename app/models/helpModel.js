exports.formBlockData = blockInfo => {
    return {
        id: blockInfo.header.id,
        height: blockInfo.header.height,
        time: blockInfo.header.timestamp,
        bits: blockInfo.header.nBits,
        nonce: blockInfo.header.nonce,
        parentId: blockInfo.header.parentId,  
        txs: blockInfo.blockTransactions,
        interlinks: blockInfo.header.interlinks
    }
}