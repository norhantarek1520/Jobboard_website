import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const CategroyDashboard = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
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
    };
    fetchCategories();
  }, []);

  // Function to handle category CRUD Operation
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await axios.delete(`http://localhost:5001/categories/${categoryId}` ,
            { headers: { Authorization: `Bearer ${token}`, } });
        if (response.status === 204) {
          setCategories(categories.filter((category) => category.id !== categoryId));
          alert('Category deleted successfully!');
        } else {
          alert('Error deleting category. Please try again later.');
        }
      } catch (error) {
        console.error(`Error deleting category:${error}`);
        alert(`Error deleting category:${error}`);
     
      }
    }
  };
  const handleUpdateCategory = async (categoryId) => {
    const categoryToUpdate = categories.find(category => category.id === categoryId);
    if (!categoryToUpdate) {
      alert('Category not found!');
      return;
    }
    const newTitle = prompt('Enter new category Title:', categoryToUpdate.title);
    const newDescription = prompt('Enter new category description:', categoryToUpdate.description);
    const updateData = {
      title: newTitle,
      description: newDescription,
    };
    try {
      const response = await axios.put(`http://localhost:5001/categories/${categoryId}`, 
        updateData , 
        { headers: { Authorization: `Bearer ${token}`, } });
      if (response.status === 200) {
        const updatedCategories = categories.map(category => {
          if (category.id === categoryId) {
            return { ...category, ...updateData }; 
          }
          return category;
        });
        setCategories(updatedCategories);
        // alert('Category updated successfully!');
      } else {
        alert('Error updating category. Please try again later.');
      }
    } catch (error) {
      console.error(`Error updating category: ${error}`);
      alert(`Error updating category: ${error}`);
    }
  };
  const handleAddNewCategory = async () => {

    const title = prompt('Enter new category title:');
    const description = prompt('Enter new category description:');
    const newCategory = {
      title,
      description,
    };

    // 4. Send POST request to add new category API endpoint
    try {
      const response = await axios.post('http://localhost:5001/categories',
         newCategory , 
         { headers: { Authorization: `Bearer ${token}`, } });
      if (response.status === 201) { // Check for created status code
        // 4.1 Update local state with new category
        setCategories([...categories, response.data]); // Add new category to state
        alert('Category added successfully!');
        window.location.href = '/CategroyDashboard';
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
                <th>Title</th>
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
                  <tr key={category.id}>
                    <td>
                      <span className="custom-checkbox">
                        <input
                          type="checkbox"
                          id={`checkbox-${category.id}`}
                          name="options[]"
                          value={category.id}
                        />
                        <label htmlFor={`checkbox-${category.id}`}></label>
                      </span>
                    </td>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>
                      <button onClick={() => handleUpdateCategory(category.id)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteCategory(category.id)}>
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
