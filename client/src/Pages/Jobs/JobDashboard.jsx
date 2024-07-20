import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const JobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null); 
  const navigate = useNavigate(); // Initialize navigate hook
  const [token, setToken] = useState(null);
  useEffect(() => {

    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:5001/jobs');
        setJobs(response.data.jobs); // Assuming 'data' property holds the jobs array
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
        const response = await axios.delete(`http://localhost:5001/jobs/${jobId}` , 
          { headers: { Authorization: `Bearer ${token}`} }
        );
        if (response.status === 204) {
          setJobs(jobs.filter((job) => job.id !== jobId));
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
    setSelectedJobId(jobId);
    localStorage.setItem('jobId', jobId)
    navigate(`/UpdateJob`); // Redirect to job details page with IDS
  
  };
  const handleApplicatios    = async (jobId) => {
    setSelectedJobId(jobId);
    localStorage.setItem('jobId', jobId)
    navigate(`/GetJobApplications`);
  
  };
  const handleJobTitleClick = (jobId) => {
    setSelectedJobId(jobId);
    localStorage.setItem('jobId', jobId)
    navigate(`/JobDetailsArea`); // Redirect to job details page with IDS
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
                  <th>experience</th>
                  {/* <th>APPLICATIONS</th> */}
                  <th>Edit</th>
                  <th> Delete</th>

                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id || job.id}> {/* Use a unique identifier for the key */}
                    <td>
                      <span className="custom-checkbox">
                        <input type="checkbox" id={`checkbox${job.id || job.id}`} name="options[]" value={job.id || job.id} />
                        <label htmlFor={`checkbox${job.id || job.id}`}></label>
                      </span>
                    </td>
                    <td>
                    <a onClick={() => handleJobTitleClick(job.id)}>
                      {job.title}
                       </a>
                      </td>
                    <td>{job.job_type}</td>
                    <td>{job.experience}</td>
                    {/* <td>
                      <button onClick={() => handleApplicatios(job.id)}>
                      APPLICATIONS
                      </button>
                    </td> */}

                    <td>
                      <button onClick={() => handleUpdateJob(job.id)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteJob(job.id)}>
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
