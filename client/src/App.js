import React from 'react';
import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
// Admin website pages 
import CategroyDashboard from "./Pages/Categories/CategroyDashboard";
import JobDashboard from "./Pages/Jobs/JobDashboard";
import CompanyDashboard from './Pages/Companies/CompanyDashboard';
import PostJob from "./Pages/Jobs/PostJob";
import GetUserApplicaions from './Pages/Applications/GetUserApplicaions'
import GetJobApplications from './Pages/Applications/GetJobApplications'
import UpdateJob from './Pages/Jobs/UpdateJob'
// User website pages 
import ApplicationArea from "./Pages/Applications/ApplicationArea";
import CatagoryArea from "./Pages/Categories/CatagoryArea";
import CompaniesArea from "./Pages/Companies/CompaniesArea";
import JobDetailsArea from "./Pages/Jobs/JobDetailsArea";
import JobsArea from "./Pages/Jobs/JobsArea";
import UserProfile from "./Pages/Users/UserProfile"
import EditUserProfile from './Pages/Users/EditUserProfile'
import MySavedJobs from './Pages/Jobs/MySavedJobs'
// owner website page 

// 
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

function App() {
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    // Optional: Trigger reload on initial render or specific conditions
    setShouldReload(true);
  }, []);

  const handleReload = () => {
    setShouldReload(true);
  };

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
  
          <Route path="/ApplicationArea" element={<ApplicationArea />} />
          <Route path='/UserProfile' element={<UserProfile/>} />
          <Route path='/EditUserProfile' element={<EditUserProfile/>} />
          <Route path='/MySavedJobs' element={<MySavedJobs />} />
        
         
          
          {/* Admin pages  */}
          <Route path="/PostJob" element={<PostJob />} />
          <Route path="/JobDashboard" element={<JobDashboard />} />
          <Route path="/CategroyDashboard" element={<CategroyDashboard />} />
          <Route path="/CompanyDashboard" element={<CompanyDashboard />} />
          <Route path='/GetUserApplicaions' element={<GetUserApplicaions/>} />
          <Route path='/UpdateJob' element={<UpdateJob/>} />
          <Route path='/GetJobApplications' element={<GetJobApplications/>} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
