const express = require('express');
const router = express.Router();


const adminController = require('../controllers/admin-controller')

// http://localhost:8000/admin
router.post('/',  adminController.create);
router.get('/:id', adminController.show);
router.get('/', adminController.index);



module.exports = router;