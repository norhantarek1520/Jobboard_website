const express = require('express');
const router = express.Router();
const {JobController} = require('../Controllers/JobController')
const{isAdmin}= require('../Middlwares/isAdminMiddleware')

router.post('/',isAdmin , JobController.createJob);
router.put('/:jobId',isAdmin , JobController.updateJob );
router.delete('/:jobId', isAdmin , JobController.deleteJob);
router.get('/' , JobController.getAllJobs);
router.get('/:jobId', JobController.getSpecificJob);

module.exports = router


