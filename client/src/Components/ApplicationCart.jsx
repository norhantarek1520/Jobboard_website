import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ApplicationCart() {
  const [formData, setFormData] = useState({
    cv_link: '',
    portfolio: '',
    // ... other form fields
  });
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); // Assuming your token is stored under 'token' key
    const storedJobId = localStorage.getItem('jobId');
    setToken(storedToken);
    setJobId(storedJobId);
  }, []); // Empty dependency array to run only once on component mount

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      alert('You are not logged in. Please login to apply for jobs.');
      return;
    }

    if (!jobId) {
      alert('Job ID not found. Please select a job before applying.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5001/applications/${jobId}`,
        formData, // Include cv and portfolio in formData
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include authorization token
          },
        }
      );

      if (response.status === 201) {
        alert('Application submitted successfully!');
        setFormData({ cv_link: '', portfolio: '' }); // Clear relevant form data
        localStorage.removeItem('jobId'); // Remove job ID from localStorage
        navigate('/'); // Redirect to homepage
      } else {
        alert('There was an error submitting your application. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      window.alert('Server problem in Application server . Please try again later.');
    }
  };

  return (
    <div className="job_details_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="apply_job_form white-bg">
              <h4>Apply for the job</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* ... other form fields */}

                  <div className="col-md-12">
                    <div className="input_field">
                    
                      <input
                        type="text"
                        placeholder="Enter your cv_link link"
                        name="cv_link"
                        id="cv_link"
                        value={formData.cv_link}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="input_field">
                    
                      <input
                        type="text"
                        placeholder="Enter your portfolio link"
                        name="portfolio"
                        id="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="submit_btn">
                      <button className="boxed-btn3 w-100" type="submit">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCart;
