import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
// Admin website pages 
import CategroyDashboard from "./Pages/Categories/CategroyDashboard";
import JobDashboard from "./Pages/Jobs/JobDashboard";
import CompanyDashboard from './Pages/Companies/CompanyDashboard';
import PostJob from "./Pages/Jobs/PostJob";
// User website pages 
import ApplicationArea from "./Pages/Applications/ApplicationArea";
import CatagoryArea from "./Pages/Categories/CatagoryArea";
import CompaniesArea from "./Pages/Companies/CompaniesArea";
import JobDetailsArea from "./Pages/Jobs/JobDetailsArea";
import JobsArea from "./Pages/Jobs/JobsArea";
import UserProfile from "./Pages/Users/UserProfile"
// owner website page 

// 
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

function App() {
  return (
    <div className="App">

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* general pages */}
          <Route path="/CatagoryArea" element={<CatagoryArea />} />
          <Route path="/JobsArea" element={<JobsArea />} />
          <Route path="/CompaniesArea" element={<CompaniesArea />} />

          <Route path="/JobDetailsArea" element={<JobDetailsArea />} />

          <Route path="/Login" element={<Login />} />
          <Route path='/Register' element={< Register/>} />

          {/* user pages */}
          {/* UserProfile */}
          {/* EditUserProfile */}
          <Route path="/ApplicationArea" element={<ApplicationArea />} />
          <Route path='/UserProfile' element={<UserProfile/>} />
        
         
          
          {/* Admin pages  */}
          <Route path="/PostJob" element={<PostJob />} />
          <Route path="/JobDashboard" element={<JobDashboard />} />
          <Route path="/CategroyDashboard" element={<CategroyDashboard />} />
          <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
          

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
