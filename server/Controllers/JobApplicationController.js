const { JobApplication } = require('../Models/Jobapplication'); // Assuming JobApplication class is in the same directory
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
const { getUserId } = require('../Shared/SharedFunctions');


class JobApplicationController {
  static applyForJob = asyncHandler(async (req, res,next) => {
    try {
      let authToken;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        authToken = req.headers.authorization.split(' ')[1];
      }
      if (!authToken) {
        return next(new ApiError('You are not login, Please login to get access this route', 401));
      }
      const userID = await getUserId(authToken)
      const newApplication = {
        userID: userID.userId,
        jobID: parseInt(req.params.jobId),
        cv_link: req.body.cv_link,
        portfolio: req.body.portfolio
      }

      const created = await JobApplication.create(newApplication);
      if (created) {
        res.status(201).json({ message: 'Job application created successfully' });
      } else {
        res.status(500).json({ message: 'Error creating job application' });
      }
    }
    catch (error) {return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));}
  });
  static updateApplication = asyncHandler(async (req, res,next) => {
    const applicationId= req.params.applicationId  ;
    if( applicationId == ':applicationId' )  {return next(new ApiError(`Select the application (enter applicationId) `, 404));}
  
    try {
      const applicationToUpdate = {
        status: req.body.status,
        cv_link: req.body.cv_link,
        portfolio: req.body.portfolio,
        id : applicationId
      };
// res.json(applicationToUpdate)
      const updated = await JobApplication.update(applicationToUpdate);
      if (updated) {
        res.status(200).json({ message: 'Job application updated successfully' });
      } else {
        res.status(404).json({ message: 'Job application not found' });
      }
    }
    catch (error) {return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));}

  });
  static deleteApplication = asyncHandler(async (req, res,next) => {
   
    const applicationId= req.params.applicationId  ;
    if( applicationId == ':applicationId' )  {return next(new ApiError(`Select the application (enter applicationId) `, 404));}
  

    try {
      const deleted = await JobApplication.delete(applicationId);
      if (deleted) {
        res.status(204).json({ message: 'Job application deleted successfully' });
      } else {
        res.status(404).json({ message: 'Job application not found' });
      }
    } 
    catch (error) {return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));}
  });
  static getAllApplications = asyncHandler(async (req, res,next) => {
    try {
      const applications = await JobApplication.getAll();
      res.status(200).json({applications:applications});
    } 
    catch (error) {return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));}
  });
  static getApplicationById = asyncHandler(async (req, res,next) => {
    const applicationId = req.params.applicationId;
   
    if( applicationId == ':applicationId' )  {return next(new ApiError(`Select the application (enter applicationId) `, 404));}
  

    try {
      const application = await JobApplication.getById(applicationId);
      if (application) {
        res.status(200).json(application);
      } else {
        res.status(404).json({ message: 'This Job application not found ' });
      }
    }
    catch (error) {return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));}
  });
  static getJobApplicaions = asyncHandler(async (req, res,next) => {
    const jobId= req.params.jobId  ;
    if( jobId == ':jobId' )  {return next(new ApiError(`Select the job (enter jobId) `, 404));}
  
    try {
  
     const applications = await JobApplication.getByJobID(jobId)
     if (applications) {
      res.status(200).json( applications );
    } else {
      res.status(404).json({ message: 'This Job application not found' });
    }
    }
    catch (error) {return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));}
  });
  static getUserApplicaions = asyncHandler(async (req, res,next) => {
    let authToken;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
     authToken = req.headers.authorization.split(' ')[1]; 
    }
    if (!authToken) {
      return next( new ApiError('You are not login, Please login to get access this route',401) );
    }
   
   try {
     const userId = getUserId(authToken)
   
     
      const applications = await JobApplication.getByUserID(userId.userId)
      if (applications) {
       res.status(200).json( applications );
    
     } else {
       res.status(404).json({ message: 'This Job application not found' });
     }
     
    }
    catch (error) {return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));}
  });
  static updateApplicatoinStatus = asyncHandler(async (req, res,next) => {
    try {
     
    }
    catch (error) {return next(new ApiError(`Internal server error  , The error is : ${error}`, 500));}
  });
  
}
module.exports = { JobApplicationController }