import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    job_type: '',
    location: '',
    vacancy: '',
    salary: '',
    description: '',
    qualifications: '',
    deadline: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title  || !formData.location  || !formData.salary) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/job', formData);

      if (response.status === 200) { // Assuming successful creation returns status 201
        alert('Job added successfully!');
        // Clear form data after successful submission (optional)
        setFormData({
          title: '',
          job_type: '',
          location: '',
          vacancy: '',
          salary: '',
          description: '',
          qualifications: '',
          deadline: '',
        });
      } else {
        alert('There was an error adding the job. Please try again later.');
      }
    } catch (error) {
      console.error('Error in job:', error);
      alert('An unexpected error occurred. Please try again later.' );
      window.alert('Server problem in Jobs service. Please try again later.');
    }
  };


  return (
    <div className="add-new-job">
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h3>Add New Job</h3>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "8rem",border: "1px solid black",margin: "8rem",flex: '1',}}>
          <div className="container">
    <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="job_type">Job Type</label>
            <select
              name="job_type"
              id="job_type"
              value={formData.job_type}
              onChange={handleChange}
            >
              <optgroup label="Job Type">
                <option value="part-time">Part Time</option>
                <option value="full-time">Full Time</option>
              </optgroup>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vacancy">Vacancy</label>
            <input
              type="number"
              className="form-control"
              name="vacancy"
              value={formData.vacancy}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">salary</label>
            <input
              type="number"
              className="form-control"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="qualifications">qualifications</label>
            <input
              type="text"
              className="form-control"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"  // Change type to "date"
              className="form-control"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>


         

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
    </form>
      </div>
      </div>

    
    </div>
  );
}

export default PostJob;

         