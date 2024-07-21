const express = require('express');
const router = express.Router();
const {JobApplicationController} = require('../Controllers/JobApplicationController')
const{isAdmin}= require('../Middlwares/isAdminMiddleware')
const {isAuthorized} = require('../Middlwares/isAuthorizedMiddleware')

router.post('/:jobId', isAuthorized,JobApplicationController.applyForJob);
router.put('/:applicationId', isAuthorized, JobApplicationController.updateApplication);
router.delete('/:applicationId', isAuthorized, JobApplicationController.deleteApplication);

router.get('/userApplications', isAuthorized, JobApplicationController.getUserApplicaions)
router.get('/job_applications/:jobId' , isAdmin , JobApplicationController.getJobApplicaions)
router.get('/', isAdmin,JobApplicationController.getAllApplications);
// router.put('/admin/:applicationId', isAdmin, JobApplicationController.updateApplicatoinStatus);
 router.get('/:applicationId', isAuthorized, JobApplicationController.getApplicationById);
module.exports = router
