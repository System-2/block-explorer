const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers/controller');

router.get('/info', controllers.info.getInfo);

//API
router.get('/txns/:limit/:page', controllers.txn.getLimitTxns);
router.get('/txns/:blockId/:id', controllers.txn.getTxn)

module.exports = router;