import React, { useState, useEffect } from "react";
import axios from "axios";
function GetUserApplicaions() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = getUserIdFromLocalStorage(); // Function to retrieve user ID from local storage

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response =   await axios.get('http://localhost:5001/applications/admin');;
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Error fetching applications. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [userId]); // Dependency array to trigger fetch on user ID change

  return (
    <div>
      {/* Existing bradcam section */}
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Your Job Applications</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="top_companies_area">
        <div className="container">
          <div className="row align-items-center mb-40">
            <div className="col-lg-6 col-md-6">
              <div className="section_title">
                <h3></h3> {/* Optional: Add a subtitle if needed */}
              </div>
            </div>
          </div>

          {isLoading && <p>Loading applications...</p>}
          {error && <p>Error: {error}</p>}

          {applications.length > 0 && (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company Name</th>
                  <th>Status</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    {/* Assuming job title and company name can be retrieved from job data */}
                    <td>{ /* Get job title from job data */}</td>
                    <td>{ /* Get company name from job data */}</td>
                    <td>{application.status}</td>
                    <td>{application.appliedOn.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {applications.length === 0 && !isLoading && (
            <p>You haven't applied for any jobs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function getUserIdFromLocalStorage() {
  // Implement logic to retrieve user ID from local storage (e.g., using localStorage.getItem('userId'))
  return 123; // Replace with actual retrieval logic
}

export default GetUserApplicaions;
