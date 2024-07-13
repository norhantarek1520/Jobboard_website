import axios from 'axios';
import React, { useState, useEffect } from 'react';

function CategoryList() {
const [categories, setCategories] = useState([]);

useEffect(() => {
const fetchData = async () => {
try {
  const response = await axios.get('http://localhost:5001/categories');
  setCategories(response.data.categories);
} catch (error) {
  console.error('Error fetching categories:', error);
  window.alert('Server problem in Category server. Please try again later.');
}
};

fetchData();
}, []);

return (
<div className="popular_catagory_area">
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div className="section_title mb-40">
        <h3>Popolar Categories</h3>
      </div>
    </div>
  </div>

  {categories.length == 0 ? (<p>No categories found.</p>) : (
<div className="row">
    {categories.map((category) => (
    <div className="col-lg-4 col-xl-3 col-md-6">
      <div className="single_catagory">
            <div className="thumb"> <img src="/assets/img/svg_icon/6.svg" alt="" />  </div>

            <a href="#">  <h3>{category.title}</h3>  </a>

            <p>  <span>description : </span>   </p>
            
            <p>{category.description || "No description available."}</p>
            
      </div>
    </div>
    ))}

</div>
)}



</div>
</div>

);
}

export default CategoryList;
