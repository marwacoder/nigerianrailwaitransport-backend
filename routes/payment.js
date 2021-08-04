const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment-controller')

// http://localhost:8000/payments
router.post('/', paymentController.create);

router.get('/', paymentController.index);
router.get('/:id', paymentController.show);
router.post('/destroy/:id', paymentController.destroy);
router.post('/amend/:id', paymentController.update);


module.exports = router;
