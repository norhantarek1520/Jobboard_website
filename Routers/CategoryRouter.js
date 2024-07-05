const express = require('express');
const CategoryController = require('../Controllers/CategoryController'); 
const router = express.Router();


router.post('/', CategoryController.addNewCategory);
router.put('/:categoryId', CategoryController.updateCategory);
router.delete('/:categoryId', CategoryController.deleteCategory);
router.get('/',CategoryController.getAllCategories );
router.get('/:categoryId', CategoryController.getSpecificCategory);
router.get('/jobs/:categoryId' , CategoryController.getJobsInSpecificCategory)
module.exports = router;
