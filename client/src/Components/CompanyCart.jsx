import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CompanyCart() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/companies');
        setCompanies(response.data.companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
        window.alert('Server problem in companies server. Please try again later.');
      }
    };

    fetchData();
  }, []);

return (<div>
<div className="popular_catagory_area">
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div className="section_title mb-40">
        <h3>Popolar companies</h3>
      </div>
    </div>
  </div>
{companies.length == 0 ? (<p>No companies found.</p>) : (
<div className="row">
    {companies.map((company) => (
    <div className="col-lg-4 col-xl-3 col-md-6">
      <div className="single_catagory">
            <div className="thumb"> <img src="/assets/img/svg_icon/5.svg" alt="" />  </div>

            <a href="#">  <h3>{company.name}</h3>  </a>
            <h4 > {company.industry} </h4>
            <h5>  <span>{company.location || "N/A"}</span>  </h5>
            
            
            <p>About : {company.description || "No description available."}</p>
            
      </div>
    </div>
    
    ))}

</div>
)}

</div></div>

</div>);}

export default CompanyCart;
