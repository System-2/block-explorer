const dir = __dirname;

module.exports = {
    block: require(`${dir}/block`),
    txn: require(`${dir}/txn`),
    chart: require(`${dir}/chart`),
    search: require(`${dir}/search`).search,
    main: require(`${dir}/main`)
};
