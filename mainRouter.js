const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers/controller');

router.get('/blocks', controllers.main.getMainPage);
router.get('/blocks/:id', controllers.block.getBlockInfoPage);

router.get('/txns/:page', controllers.txn.getAllView);
router.get('/txn/:id/:block', controllers.txn.getView);
router.get('/chart1', controllers.chart.txnChart);

module.exports = router;