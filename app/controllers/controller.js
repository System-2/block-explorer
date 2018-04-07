const dir = __dirname;

module.exports = {
    block: require(`${dir}/block`),
    txn: require(`${dir}/txn`),
    search: require(`${dir}/search`).search
};
