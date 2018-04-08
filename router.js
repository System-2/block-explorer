const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers/controller');

//API
router.get('/blocks/last/:count', controllers.block.getBlocks);
router.get('/blocks/:headerId', controllers.block.getBlock);
router.get('/txns/:limit/:page', controllers.txn.getLimitTxns);
router.get('/txn/:blockId/:id', controllers.txn.getTxn);
router.get('/stat/txns/:limit', controllers.chart.tranasctionsInfo);
router.get('/stat/difficulty/:limit', controllers.chart.getDiffStats);

module.exports = router;