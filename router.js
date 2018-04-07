const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers/controller');

router.get('/info', controllers.info.getInfo);

module.exports = router;