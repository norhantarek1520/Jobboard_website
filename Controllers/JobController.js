const express = require('express');
const Job = require('./Job'); // Assuming Job class is in the same directory
const asyncHandler = require('express-async-handler');
const ApiError = require('../Shared/ApiError');
const router = express.Router();

// Create a new job
router.post('/jobs', async (req, res) => {
  try {
    const newJob = new Job(
      null,
      req.body.title,
      req.body.jobType,
      req.body.owner,
      req.body.experience,
      req.body.location,
      req.body.image,
      req.body.publishedOn,
      req.body.deadline,
      req.body.qualifications,
      req.body.responsibility,
      req.body.vacancy,
      req.body.salary,
      req.body.categoryId
    );

    const created = await Job.create(newJob);
    if (created) {
      res.status(201).json({ message: 'Job created successfully' });
    } else {
      res.status(500).json({ message: 'Error creating job' });
    }
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a job
router.put('/jobs/:jobId', async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const jobToUpdate = {
      title: req.body.title,
      jobType: req.body.jobType,
      owner: req.body.owner,
      experience: req.body.experience,
      location: req.body.location,
      image: req.body.image,
      publishedOn: req.body.publishedOn,
      deadline: req.body.deadline,
      qualifications: req.body.qualifications,
      responsibility: req.body.responsibility,
      vacancy: req.body.vacancy,
      salary: req.body.salary,
      categoryId: req.body.categoryId,
    };

    const updated = await Job.update(jobToUpdate, jobId);
    if (updated) {
      res.status(200).json({ message: 'Job updated successfully' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a job
router.delete('/jobs/:jobId', async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const deleted = await Job.delete(jobId);
    if (deleted) {
      res.status(200).json({ message: 'Job deleted successfully' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.getAll();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error getting all jobs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific job
router.get('/jobs/:jobId', async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.getOneJob(jobId);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error getting job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get jobs by category ID (optional)
router.get('/categories/:categoryId' , async (req, res) => {
}
)
