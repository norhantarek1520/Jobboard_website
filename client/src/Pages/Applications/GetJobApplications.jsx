import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetJobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [jobId, setJobId] = useState('');
  const [token, setToken] = useState(null);
  // Fetches job applications on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    const storedJobId = localStorage.getItem('jobId');
    setJobId(storedJobId);

    const fetchJobApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/applications/job_applications/${jobId}` ,
          { headers: { authorization: `Bearer ${token}`} }
        );
        setJobApplications(response.data);
      
      } catch (error) {
        console.error('Error fetching job applications:', error);
        alert('Error fetching job applications!');
      }
    };

    if (jobId) {
      fetchJobApplications();
    }
  }, [jobId]);

  // Function to handle job id change from local storage
  useEffect(() => {
    const handleJobIdChange = () => {
      const newJobId = localStorage.getItem('jobId');
      setJobId(newJobId);
    };

    window.addEventListener('storage', handleJobIdChange);

    return () => window.removeEventListener('storage', handleJobIdChange);
  }, []);
  const handleUpdateStatus = async (applicationId) => {

  };

  return (
    <div className="company-dashboard">
           {/* <!-- bradcam_area  --> */}
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>job Applicaions</h3>
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
               
              </div>
            </div>
          </div>

          {jobApplications.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                
                  <th>CV Link</th>
                  <th>Portfolio</th>
                  <th>status</th>
                  <th>userID</th>
                  <th>appliedOn</th>
                  <th>update status</th>
                </tr>
              </thead>
              <tbody>
                {jobApplications.map((application) => (
                  <tr key={application.id}>
                   
                    <td>
                      <a href={application.cv_link} target="_blank">
                     { application.cv_link}
                      </a>
                    </td>
                    <td>
                      {application.portfolio ? (
                        <a href={application.portfolio} target="_blank">
                        { application.portfolio}
                        </a>
                      ) : (
                        <p>No Portfolio Provided</p>
                      )}
                    </td>
                    <td> <p>{application.status} </p> </td>
                    <td> <p>{application.userID} </p> </td>
                    <td> <p>{application.appliedOn} </p> </td>
                    <td>
                      <button onClick={() => handleUpdateStatus(application.id)}>
                      update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No job applications found for this job.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetJobApplications;
