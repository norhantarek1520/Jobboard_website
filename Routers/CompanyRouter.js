const express = require('express');
const CompanyController = require('../Controllers/CompanyController'); 
const router = express.Router();
const{isAdmin}= require('../Middlwares/isAdminMiddleware')

router.post('/',isAdmin, CompanyController.addNewCompany);
router.put('/:companyId',isAdmin, CompanyController.updateCompany);
router.delete('/:companyId',isAdmin, CompanyController.deleteCompany);
router.get('/',CompanyController.getAllcompanies );
router.get('/:companyId', CompanyController.getSpecificCompany);

module.exports = router;
