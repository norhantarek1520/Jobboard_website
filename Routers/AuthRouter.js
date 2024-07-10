const express = require('express');
const {AuthController} = require('../Controllers/AuthController'); 
const { isAuthorized } = require('../Middlwares/isAuthorizedMiddleware');
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/logout' , isAuthorized ,AuthController.logout)

module.exports = router;
