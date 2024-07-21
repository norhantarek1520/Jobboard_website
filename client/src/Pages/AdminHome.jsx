import React from "react";

import JobTable from '../Components/JobTable'
import CategroyTable from '../Components/CategroyTable'
import CompanyTable from '../Components/CompanyTable'

function AdminHome(){
return(
<div>

    <div className="slider_area">
        <div className="single_slider  d-flex align-items-center slider_bg_1">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 col-md-6">
                        <div className="slider_text">
                            <h5 className="wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".2s">4536+ Jobs listed</h5>
                            <h3 className="wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".3s">Find your Dream Job</h3>
                            <p className="wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".4s">We provide online instant cash loans with quick approval that suit your term length</p>
                            <div class="sldier_btn wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".5s">
                                 <a href="/JobsArea" class="boxed-btn3">Find Your Job</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="ilstration_img wow fadeInRight d-none d-lg-block text-right" data-wow-duration="1s" data-wow-delay=".2s">
            <img src="../public/assets/img/banner/illustration.png" alt=""/>
        </div>
    </div>

     {/* <!-- popular_catagory_area_start  --> */}
<CategroyTable/>
    {/* <!-- popular_catagory_area_end  --> */}
   
    <div></div>
    <div className="job_searcing_wrap overlay">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 offset-lg-1 col-md-6">
                    <div className="searching_text">
                        <h3>Looking for a Job?</h3>
                        <p>We provide online instant cash loans with quick approval </p>
                        <a href="/JobsArea" className="boxed-btn3">Browse Job</a>
                    </div>
                </div>
                <div className="col-lg-5 offset-lg-1 col-md-6">
                    <div className="searching_text">
                        <h3>Looking for a Expert?</h3>
                        <p>We provide online instant cash loans with quick approval </p>
                        <a href="/PostJob" className="boxed-btn3">Post a Job</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
     {/* <!-- job_listing_area_start  --> */}
<JobTable/>
    {/* <!-- job_listing_area_end  --> */}

    {/* <!-- job_searcing_wrap  --> */}
    <div></div>
    <div className="job_searcing_wrap overlay">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 offset-lg-1 col-md-6">
                    <div className="searching_text">
                        <h3>Looking for a Company?</h3>
                        <p>We provide online instant cash loans with quick approval </p>
                        <a href="/JobsArea" className="boxed-btn3">Browse Company</a>
                    </div>
                </div>
                <div className="col-lg-5 offset-lg-1 col-md-6">
                    <div className="searching_text">
                        <h3>Looking for a Expert?</h3>
                        <p>We provide online instant cash loans with quick approval </p>
                        <a href="/PostCompany" className="boxed-btn3">Post a Company</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- job_searcing_wrap end  --> */}

 <CompanyTable/>



  
  
            
    
</div>)
}

export default AdminHome 