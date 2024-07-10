const express = require('express');
const CategoryController = require('../Controllers/CategoryController'); 
const router = express.Router();
const{isAdmin}= require('../Middlwares/isAdminMiddleware')


router.post('/',isAdmin, CategoryController.addNewCategory);
router.put('/:categoryId',isAdmin, CategoryController.updateCategory);
router.delete('/:categoryId',isAdmin, CategoryController.deleteCategory);
router.get('/',CategoryController.getAllCategories );
router.get('/:categoryId', CategoryController.getSpecificCategory);
router.get('/jobs/:categoryId' , CategoryController.getJobsInSpecificCategory)
module.exports = router;
