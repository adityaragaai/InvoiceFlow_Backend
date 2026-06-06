const router = require('express').Router();
const { getSummary, getTopCustomers } = require('../controllers/dashboardController');

router.get('/summary', getSummary);
router.get('/top-customers', getTopCustomers);

module.exports = router;
