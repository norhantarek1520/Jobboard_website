import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const CompanyDashboard = () => {
  const [Companies, setCompanies] = useState([]); // State to store fetched Companies
  const [token, setToken] = useState(null);
  // Fetches Companies on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/companies/');
        setCompanies(response.data.companies);
      } catch (error) {
        console.error(`Error fetching Companies: ${error}`);
        window.alert(`Error fetching Companies: ${error}`);
      }
    };
    fetchCompanies();
  }, []);

  // Function to handle company CRUD Operation
  const handleDeletecompany = async (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        const response = await axios.delete(`http://localhost:5001/companies/${companyId}` ,  
          { headers: { Authorization: `Bearer ${token}`, } })
        if (response.status === 204) {
          setCompanies(Companies.filter((company) => company.id !== companyId));
          alert('company deleted successfully!');
        } else {
          alert('Error deleting company. Please try again later.');
        }
      } catch (error) {
        console.error('Error deleting company:', error);
        alert('An unexpected error occurred. Please try again later.');
        
      }
    }
  };
  const handleUpdatecompany = async (companyId) => {
    const companyToUpdate = Companies.find(company => company.id === companyId);
    if (!companyToUpdate) {
      alert('company not found!');
      return;
    }
    const newName = prompt('Enter new company name:', companyToUpdate.name);
    const newDescription = prompt('Enter new company description:', companyToUpdate.description);
    const newLocation = prompt('Enter new company location:', companyToUpdate.location);
    const newWebsite = prompt('Enter new company website:', companyToUpdate.website);
    const newIndustry = prompt('Enter new company industry:', companyToUpdate.industry);
    const updateData = {
      name: newName,
      description: newDescription,
      website : newWebsite,
      location : newLocation ,
      industry :newIndustry
    };
    try {
      const response = await axios.put(`http://localhost:5001/companies/${companyId}`,
         updateData ,
         { headers: { Authorization: `Bearer ${token}`, } });
      if (response.status === 200) {
        const updatedCompanies = Companies.map(company => {
          if (company.id === companyId) {
            return { ...company, ...updateData }; // Merge updated data
          }
          return company;
        });
        setCompanies(updatedCompanies);
        alert('company updated successfully!');
      } else {
        alert('Error updating company. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating company:', error);
      alert('Error updating company:', error);
      
    }
  };
  const handleAddNewcompany = async () => {
    // 1. Get user input for name and description
    const name = prompt('Enter new company name:');
    const description = prompt('Enter new company description:');
    const industry = prompt('Enter new company industry ')
    const website = prompt('Enter new company website ')
    const location = prompt('Enter new company location ')
    const newcompany = {
      name,
      description,
      website ,
      location ,
      industry
    };
    try {
      const response = await axios.post('http://localhost:5001/companies',
         newcompany ,
         { headers: { Authorization: `Bearer ${token}`, } });
      if (response.status === 201) { // Check for created status code
        // 4.1 Update local state with new company
        setCompanies([...Companies, response.data]); // Add new company to state
        alert('company added successfully!');
        window.location.href = '/CompanyDashboard';
      } else {
        alert('Error adding company. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding company:', error);
      alert('An unexpected error occurred. Please try again later.');
      
    }
  };

  return (<div>

    <div className="bradcam_area bradcam_bg_1">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="bradcam_text">
              <h3>top Companies  Available</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="company-dashboard">


      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">

              </div>
              <div className="col-sm-6 add-company-button text-right mt-3">
                {/*  */}
                <button className="btn btn-success" onClick={() => handleAddNewcompany()}>
                  Add New Cateogry
                </button>

              </div>
            </div>
          </div>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Location</th>
                <th>Industry</th>
                <th>website</th>
                <th>Edit</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {Companies.length === 0 ? (
                <p>Loading Companies...</p>
              ) : (

                Companies.map((company) => (
                  <tr key={company.id}>
                    <td>
                      <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`checkbox-${company.id}`}
                          name="options[]"
                          value={company.id}
                        />
                        <label htmlFor={`checkbox-${company.id}`}></label>
                      </span>
                    </td>
                    <td>{company.name}</td>
                    <td>{company.location}</td>
                    <td>{company.industry}</td>
                    <td>{company.website}</td>
                  
                    <td>
                      <button onClick={() => handleUpdatecompany(company.id)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeletecompany(company.id)}>
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


  </div>);
};

export default CompanyDashboard;
