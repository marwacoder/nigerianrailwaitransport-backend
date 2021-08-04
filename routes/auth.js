const express = require('express');
const router = express.Router();


const authController = require('../controllers/auth-controller')

// http://localhost:8000/users
router.post('/login/action', authController.auth);


module.exports = router;