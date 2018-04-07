const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers/controller');

// router.get('/info', controllers.info.getInfo);
router.get('/blocks/last/:count', controllers.block.getBlocks);
router.get('/blocks/:headerId', controllers.block.getBlock);

module.exports = router;