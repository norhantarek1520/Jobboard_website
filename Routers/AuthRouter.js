const express = require('express');
const {AuthController} = require('../Controllers/AuthController'); 
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/logout' , AuthController.logout)

module.exports = router;
