const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers/controller');

router.get('/info', controllers.info.getInfo);
router.get('/blocks/:count', controllers.block.getBlocks);

module.exports = router;