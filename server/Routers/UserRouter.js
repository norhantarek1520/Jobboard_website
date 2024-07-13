const express = require('express');
const {UserController} = require('../Controllers/UserController'); 
const router = express.Router();
const{isAdmin}= require('../Middlwares/isAdminMiddleware')
const {isAuthorized} = require('../Middlwares/isAuthorizedMiddleware')

router.get('/', isAdmin , UserController.getAllUsers);
router.put('/:id',isAuthorized , UserController.updateUser);
router.delete('/:id',isAdmin ,UserController.deleteUser)
router.get('/myprofile', isAuthorized,UserController.getOneUser);

module.exports = router;
