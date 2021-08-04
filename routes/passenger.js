const express = require('express');
const router = express.Router();

const passengerController = require('../controllers/passenger-controller')

// http://localhost:8000/passengers
router.post('/', passengerController.create);
router.get('/', passengerController.index);
router.get('/:id', passengerController.show);
router.post('/destroy/:id', passengerController.destroy);
router.post('/amend/:id', passengerController.update);


module.exports = router;
