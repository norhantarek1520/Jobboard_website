import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const CategroyDashboard = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories

  // Fetches categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5001/categories');
        setCategories(response.data.list);
      } catch (error) {
        console.error('Error fetching categories:', error);
        window.alert('Server problem in Cateotry service . Please try again later.');
      }
    };
    fetchCategories();
  }, []);

  // Function to handle category CRUD Operation
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await axios.delete(`http://localhost:5001/categories/${categoryId}`);
        if (response.status === 204) {
          setCategories(categories.filter((category) => category._id !== categoryId));
          alert('Category deleted successfully!');
        } else {
          alert('Error deleting category. Please try again later.');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('An unexpected error occurred. Please try again later.');
        window.alert('Server problem in Cateotry service . Please try again later.');
      }
    }
  };
  const handleUpdateCategory = async (categoryId) => {
    const categoryToUpdate = categories.find(category => category._id === categoryId);
    if (!categoryToUpdate) {
      alert('Category not found!');
      return;
    }
    const newName = prompt('Enter new category name:', categoryToUpdate.name);
    const newDescription = prompt('Enter new category description:', categoryToUpdate.description);
    const updateData = {
      name: newName,
      description: newDescription,
    };
    try {
      const response = await axios.put(`http://localhost:5001/categories/${categoryId}`, updateData);
      if (response.status === 201) {
        const updatedCategories = categories.map(category => {
          if (category._id === categoryId) {
            return { ...category, ...updateData }; // Merge updated data
          }
          return category;
        });
        setCategories(updatedCategories);
        alert('Category updated successfully!');
      } else {
        alert('Error updating category. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      alert('An unexpected error occurred. Please try again later.');
      window.alert('Server problem in Cateotry service . Please try again later.');
    }
  };
  const handleAddNewCategory = async () => {
    // 1. Get user input for name and description
    const name = prompt('Enter new category name:');
    const description = prompt('Enter new category description:');

    // 2. Validate user input (optional)
    // You can add checks for empty strings or invalid characters here

    // 3. Prepare new category data object
    const newCategory = {
      name,
      description,
    };

    // 4. Send POST request to add new category API endpoint
    try {
      const response = await axios.post('http://localhost:5001/categories', newCategory);
      if (response.status === 201) { // Check for created status code
        // 4.1 Update local state with new category
        setCategories([...categories, response.data]); // Add new category to state
        alert('Category added successfully!');
      } else {
        alert('Error adding category. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('An unexpected error occurred. Please try again later.');
      window.alert('Server problem in Cateotry service . Please try again later.');
    }
  };

  return (<div>

    <div className="bradcam_area bradcam_bg_1">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="bradcam_text">
              <h3>top Categories  Available</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="Category-dashboard">


      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">

              </div>
              <div className="col-sm-6 add-Category-button text-right mt-3">
                {/*  */}
                <button className="btn btn-success" onClick={() => handleAddNewCategory()}>
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
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <p>Loading categories...</p>
              ) : (

                categories.map((category) => (
                  <tr key={category._id}>
                    <td>
                      <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`checkbox-${category._id}`}
                          name="options[]"
                          value={category._id}
                        />
                        <label htmlFor={`checkbox-${category._id}`}></label>
                      </span>
                    </td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <button onClick={() => handleUpdateCategory(category._id)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteCategory(category._id)}>
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

export default CategroyDashboard;
