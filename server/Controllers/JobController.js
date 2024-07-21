const {Job} = require('../Models/Job');
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');


class JobController {

  static getAllJobs = asyncHandler(async (req, res,next) => {
    try {
      const jobs = await Job.getAll();
      res.status(200).json({jobs : jobs , length : jobs.length});
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  }); 
  static getSpecificJob = asyncHandler(async (req, res,next) => {
    const jobId = req.params.jobId;
    if( jobId == ':jobId' )  {return next(new ApiError(`Select the job (enter job id) `, 404));}
  
    try {
      const job = await Job.getById(jobId);
      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ message: 'Job not found for this id ' });
      }
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  });
  static updateJob = asyncHandler(async (req, res,next) => {
    const jobId = req.params.jobId;
    if( jobId == ':jobId' )  {return next(new ApiError(`Select the job (enter job id) `, 404));}
    try {
      const jobToUpdate = {
        title: req.body.title,
        job_type: req.body.job_type,
        owner: req.body.owner,
        experience: req.body.experience,
        location: req.body.location,
        image: req.body.image,
        deadline: req.body.deadline,
        qualifications: req.body.qualifications,
        responsibility: req.body.responsibility,
        vacancy: req.body.vacancy,
        salary: req.body.salary,
        category_id: req.body.category_id,
        id:jobId
      };
  
      const updated = await Job.update(jobToUpdate);
      if (updated) {
        res.status(200).json({ message: 'Job updated successfully' });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  });
  static deleteJob = asyncHandler(async (req, res,next) => {
    const jobId = req.params.jobId;
    if( jobId == ':jobId' )  {return next(new ApiError(`Select the job (enter job id) `, 404));}
    try {
      const deleted = await Job.delete(jobId);
      if (deleted) {
        res.status(204).json({ message: 'Job deleted successfully' });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  });
  static createJob = asyncHandler( async (req, res,next) => {
    try {
      const newJob = {
        title : req.body.title,
        job_type : req.body.job_type,
        owner : req.body.owner,
        experience : req.body.experience,
        location : req.body.location,
        image : req.body.image,
        deadline : req.body.deadline,
        qualifications : req.body.qualifications,
        responsibility : req.body.responsibility,
        vacancy : req.body.vacancy,
        salary : req.body.salary,
        category_id : req.body.category_id
      }
       
      
     const created = await Job.create(newJob);
      if (created) {
        res.status(201).json({ message: 'Job created successfully' });
      } else {
        res.status(500).json({ message: 'Error creating job' });
      }
    } catch (error) {
      return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));
    }
  });
  



}
module.exports = { JobController }



