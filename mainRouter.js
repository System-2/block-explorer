const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers/controller');

router.get('/blocks', controllers.main.getMainPage);
router.get('/blocks/:id', controllers.block.getBlockInfoPage);

module.exports = router;