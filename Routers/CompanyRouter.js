const express = require('express');
const CompanyController = require('../Controllers/CompanyController'); 
const router = express.Router();


router.post('/', CompanyController.addNewCompany);
router.put('/:companyId', CompanyController.updateCompany);
router.delete('/:companyId', CompanyController.deleteCompany);
router.get('/',CompanyController.getAllcompanies );
router.get('/:companyId', CompanyController.getSpecificCompany);

module.exports = router;
