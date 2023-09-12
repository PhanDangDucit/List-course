const express = require('express');
const router = express.Router();

const financeController = require('./../app/controllers/FinanceController');

router.get('/createVideo', financeController.createPage);
router.post('/createVideo', financeController.create);
router.get('/:slug', financeController.detail);

module.exports = router;