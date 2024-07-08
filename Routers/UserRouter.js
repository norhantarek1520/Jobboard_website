const express = require('express');
const {UserController} = require('../Controllers/UserController'); 
const router = express.Router();

router.get('/', UserController.getAllUsers);
// router.put('/:id',UserController.updateUser);
router.delete('/:id' ,UserController.deleteUser)
router.get('/:id', UserController.getUserById);

module.exports = router;
