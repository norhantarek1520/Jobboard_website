import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { useNavigate } from 'react-router-dom'; // For navigation after submission

function PostJob() {
  const [categories, setCategories] = useState([]);
  const [Companies, setCompanies] = useState([]); 
  const [formData, setFormData] = useState({
    title: '',
    job_type: '',
    owner: '',
    experience: '',
    location: '',
    image: '',
    deadline: '',
    qualifications: '',
    responsibility: '',
    vacancy: '',
    salary: '',
    category_id: ''
  });
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5001/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        window.alert(`Error fetching categories: ${error}`);
      }
    };  const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/companies/');
        setCompanies(response.data.companies);
      } catch (error) {
        console.error(`Error fetching Companies: ${error}`);
        window.alert(`Error fetching Companies: ${error}`);
      }
    };
    fetchCompanies();
    fetchCategories();
  }, []);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title || !formData.location || !formData.salary) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/jobs',
        formData,
        { headers: { Authorization: `Bearer ${token}`, } });

      if (response.status === 201) { // Assuming successful creation returns status 201
        alert('Job added successfully!');
        // Clear form data after successful submission (optional)
        setFormData({

          title: '',
          job_type: '',
          owner: '',
          experience: '',
          location: '',
          image: '',
          deadline: '',
          qualifications: '',
          responsibility: '',
          vacancy: '',
          salary: '',
          category_id: ''
        });
      } else {
        alert('There was an error adding the job. Please try again later.');
      }
    } catch (error) {
      console.error('Error in job:', error);
      alert('An unexpected error occurred. Please try again later.');
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

      <div style={{ padding: "8rem", border: "1px solid black", margin: "8rem", flex: '1', }}>
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
              <label htmlFor="description">responsibility</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={formData.responsibility}
                onChange={handleChange}

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
            <div className="form-group">
              <label htmlFor="experience">experience</label>
              <input
                type="text"
                className="form-control"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>         
            <div >
              <label htmlFor="category_id">Select Category</label>
              <select
              className="form-group d-flex justify-content-center align-items-center"
                name="category_id"
                id="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
              >

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="owner">Select Owner</label>
              <select
              className="form-group d-flex justify-content-center align-items-center"
                name="owner"
                id="owner"
                value={formData.owner}
                onChange={handleChange}
                required
              >

                {Companies.map((Company) => (
                  <option key={Company.id} value={Company.id}>
                    {Company.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="job_type">Job Type</label>
              <select
              className="form-group d-flex justify-content-center align-items-center"
                name="job_type"
                id="job_type"
                value={formData.job_type}
                onChange={handleChange}
              >
                <optgroup label="Job Type">
                  <option value="Part Time">Part Time</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                </optgroup>
              </select>
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

