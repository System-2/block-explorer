const statsModel = require('./../models/statsModel');

exports.getDiffStats = async (req, res) => {
    const limit = Number(req.params.limit);
    const difficulties = await statsModel.getDiffStats(limit);

    res.send(difficulties);
}