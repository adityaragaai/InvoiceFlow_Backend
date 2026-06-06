const router = require('express').Router();
const { getCustomers, getCustomer } = require('../controllers/customerController');

router.route('/').get(getCustomers);
router.route('/:id').get(getCustomer);

module.exports = router;
