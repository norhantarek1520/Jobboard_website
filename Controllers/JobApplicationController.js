const express = require('express');
const JobApplication = require('./JobApplication'); // Assuming JobApplication class is in the same directory

const router = express.Router();

// Create a new job application
router.post('/applications', async (req, res) => {
  try {
    const newApplication = new JobApplication(
      null, // Auto-incrementing ID
      req.body.status,
      req.body.userID,
      req.body.jobID,
      req.body.cv,
      req.body.portfolio,
      null, // AppliedOn is handled by database default
      null, // createdAt is handled by database default
      null  // updatedAt is handled by database default
    );

    const created = await JobApplication.create(newApplication);
    if (created) {
      res.status(201).json({ message: 'Job application created successfully' });
    } else {
      res.status(500).json({ message: 'Error creating job application' });
    }
  } catch (error) {
    console.error('Error creating job application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a job application
router.put('/applications/:applicationId', async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const applicationToUpdate = {
      status: req.body.status,
      cv: req.body.cv,
      portfolio: req.body.portfolio,
    };

    const updated = await JobApplication.update(applicationToUpdate, applicationId);
    if (updated) {
      res.status(200).json({ message: 'Job application updated successfully' });
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    console.error('Error updating job application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a job application
router.delete('/applications/:applicationId', async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const deleted = await JobApplication.delete(applicationId);
    if (deleted) {
      res.status(200).json({ message: 'Job application deleted successfully' });
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    console.error('Error deleting job application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all job applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await JobApplication.getAll();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error getting all job applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific job application
router.get('/applications/:applicationId', async (req, res) => {
  const applicationId = req.params.applicationId;

  try {
    const application = await JobApplication.getOne(applicationId);
    if (application) {
      res.status(200).json(application);
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    console.error('Error getting job application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get applications by user ID (optional)
router.get('/users/:userId/applications', async (req, res) => {
  const userId = req.params.userId;

  try {
    const applications = await JobApplication.getByUserID(userId);
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error getting applications by user ID:', error);
    res.status(500).json({ message: ''})}});
    
