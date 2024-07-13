import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:5001/api/job/allJobs');
        setJobs(response.data.data); // Assuming 'data' property holds the jobs array
      } catch (error) {
        setError(error);
        window.alert('Server problem in jobs service . Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/job/${jobId}`);
        if (response.status === 204) {
          setJobs(jobs.filter((job) => job._id !== jobId));
          alert('job deleted successfully!');
        } else {
          alert('Error deleting job. Please try again later.');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('An unexpected error occurred. Please try again later.');
        window.alert('Server problem in Jobs service . Please try again later.');
      }
    }
  };
  const handleUpdateJob = async (jobId) => {
    const jobToUpdate = jobs.find(job => job._id === jobId);
    if (!jobToUpdate) {
      alert('job not found!');
      return;
    }
    const newTitle = prompt('Enter new job title:', jobToUpdate.title);
    const newDescription = prompt('Enter new job description:', jobToUpdate.description);  
    const job_type = prompt("Enter new job type : ", jobToUpdate.job_type)
    const location = prompt("Enter new job loction  : ", jobToUpdate.location)
    const vacancy = prompt("Enter new job vacancy : ", jobToUpdate.vacancy)
    const salary = prompt("Enter new job salary : ", jobToUpdate.salary)
    const qualifications = prompt("Enter new qualifications  : ", jobToUpdate.qualifications)
    const deadline = prompt("Enter new job deadline : ", jobToUpdate.deadline)
    const updateData = {
      title: newTitle,
      description: newDescription,
      job_type:job_type ,
      location: location,
      vacancy: vacancy,
      salary: salary,
      qualifications: qualifications,
      deadline: deadline
    };
    try {
      const response = await axios.put(`http://localhost:5001/api/job/${jobId}`, updateData);
      if (response.status === 200) {
        const updatedjobs = jobs.map(job => {
          if (job._id === jobId) {
            return { ...job, ...updateData }; // Merge updated data
          }
          return job;
        });
        setJobs(updatedjobs);
        alert('job updated successfully!');
      } else {
        alert('Error updating job. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('An unexpected error occurred. Please try again later.');
      window.alert('Server problem in Jobs service . Please try again later.');
    }
  };
  const handleJobDetails = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {

        const response = await axios.get(`http://localhost:5001/api/job/${jobId}`);
        if (response.status === 204) {
          setJobs(jobs.filter((job) => job._id !== jobId));
          alert('job  successfully!');

          
        } else {
          alert('Error . Please try again later.');
        }
      } catch (error) {
        console.error('Error geting job:', error);
        alert('An unexpected error occurred. Please try again later.');
        window.alert('Server problem in Jobs service . Please try again later.');
      }
    }
  };



 
  return (
  <div className="job-dashboard">
      
    {/* <!-- bradcam_area  --> */}
    <div className="bradcam_area bradcam_bg_1">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="bradcam_text">
                        <h3>jobs Dashboard</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!--/ bradcam_area  --> */}

      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2 style={{ fontWeight: 'bold', color: '#dfe7f0', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>
                  Jobs Dashboard
                </h2>
              </div>
              <div className="col-sm-6 add-job-button text-right mt-3">
                <a href="/PostJob" className="btn btn-success">
                  <span>Add New Job</span>
                </a>
              </div>
            </div>
          </div>

          {isLoading && <p>Loading jobs...</p>}
          {error && <p>Error fetching jobs: {error.message}</p>}

          {jobs.length > 0 && (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Job Type</th>
                  <th>Salary</th>
                  
                  <th>Edit</th>
                  <th> Delete</th>

                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id || job.id}> {/* Use a unique identifier for the key */}
                    <td>
                      <span className="custom-checkbox">
                        <input type="checkbox" id={`checkbox${job._id || job.id}`} name="options[]" value={job._id || job.id} />
                        <label htmlFor={`checkbox${job._id || job.id}`}></label>
                      </span>
                    </td>
                    <td>{job.title}</td>
                    <td>{job.job_type}</td>
                    <td>{job.salary}</td>
                  
                    <td>
                      <button onClick={() => handleUpdateJob(job._id)}>
                        Edit                 
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteJob(job._id)}>
                        Delete                
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {jobs.length === 0 && !isLoading && <p>No jobs found.</p>}

          {/* Pagination (unchanged) */}
        </div>
      </div>
    </div>
  );
};

export default JobDashboard;
