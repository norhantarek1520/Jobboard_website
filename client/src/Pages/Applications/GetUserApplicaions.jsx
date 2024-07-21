import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const GetUserApplicaions = () => {
  const [applications, setApplications] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5001/applications/userApplications', {
          headers: { authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        alert('Error fetching applications:', error);
      }
    };

    if (token) {
      fetchApplications();
    }
  }, [token]);
  const handleUpdate = async (applicationId) => {

  };
  const handleDelete = async (applicationId) => {

  };
  const handleJobIdClick = (jobId) => {

    localStorage.setItem('jobId', jobId)
    navigate(`/JobDetailsArea`); // Redirect to job details page with IDS
  };
  return (
    <div className="user-applications">
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Your Applications</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Applications</h2>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>jobId</th>
                <th>Portfolio</th>
                <th>CV link</th>
                <th>Status</th>
                <th>AppliedOn</th>
                <th>Edit</th>
                <th>Delete</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <p>Loading Applications...</p>
              ) : (
                applications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <a onClick={() => handleJobIdClick(application.jobID)}>
                       See job Deatils
                      </a>

                    </td>
                    <td>{application.portfolio}</td>
                    <td>{application.cv_link}</td>
                    <td>{application.status}</td>
                    <td> <p>{application.appliedOn} </p> </td>
                    <td>
                      <button onClick={() => handleUpdate(application.id)}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(application.id)}>
                        Delete
                      </button>
                    </td>



                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetUserApplicaions;
