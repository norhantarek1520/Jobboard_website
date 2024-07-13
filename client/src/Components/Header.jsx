import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Link } from 'react-router-dom';
function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for token in localStorage
    if(token !== null ){
      setIsLoggedIn(true); // Set isLoggedIn based on token existence
    }
    else{setIsLoggedIn(false)}
    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false);
    navigate('/Login'); // Redirect to login page
  };

  return (
    <>
      <header>
        <div className="header-area ">
          <div id="sticky-header" className="main-header-area">
            <div className="container-fluid ">
              <div className="header_bottom_border">
                <div className="row align-items-center">
                  {/* Your navigation links here */}
                  <div className="col-xl-3 col-lg-2">
                    <div className="logo">
                       <Link to="/">
                        <img src="assets/img/logo.png" alt="" />
                       </Link>
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-7">
                    <div className="main-menu d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li> <Link to="/CatagoryArea">Catagory Area </Link></li>
                          <li> <Link to="/JobsArea">Jobs Area </Link></li>
                          <li> <Link to="/CompaniesArea">Companies Area </Link></li>
                          <li> <Link to="/UserProfile">My profile  </Link></li>
                          <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Admin </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ fontWeight: "bold", color: "#795003", textShadow: "2px 2px 2px rgba(26, 25, 25, 0.3)", fontFamily: "sans-serif" }}>
                              <Link className="dropdown-item" to ="/JobDashboard">Jobs Dashboard </Link>
                              <Link className="dropdown-item" to ="/CategroyDashboard">Categroies Dashboard </Link>
                              <Link className="dropdown-item" to ="/CompanyDashboard">Companies Dashboard </Link>
                            </div>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                    <div className="Appointment">
                      {isLoggedIn == true ? (
                        <button className="boxed-btn3" onClick={handleLogout}>
                          Logout
                        </button>
                      ) : (
                         <Link to="/Login" className="boxed-btn3">
                          Log in
                         </Link>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
