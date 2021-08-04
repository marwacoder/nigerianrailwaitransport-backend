const express = require('express');
const router = express.Router();
const Validations = require('../middleware/validations');
const trainController = require('../controllers/train-controller')

// http://localhost:8000/trains
router.post('/',Validations.validate('train'), trainController.create);
router.get('/', trainController.index);
router.get('/:id', trainController.show);
router.get('/trainTicket/:id', trainController.trainTicket);
router.post('/destroy/:id', trainController.destroy);
router.post('/amend/:id', trainController.update);


module.exports = router;
