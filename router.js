const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers/controller');

router.get('/blocks/last/:count', controllers.block.getBlocks);
router.get('/blocks/:headerId', controllers.block.getBlock);

//API
router.get('/txns/:limit/:page', controllers.txn.getLimitTxns);
router.get('/txns/:blockId/:id', controllers.txn.getTxn);

router.post('/search', controllers.search);

module.exports = router;