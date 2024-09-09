var express = require('express');
var router = express.Router();
const abcController = require('../controller/abcController');

router.get('/' , abcController.index)

router.get('/p' , abcController.p)

module.exports = router;

