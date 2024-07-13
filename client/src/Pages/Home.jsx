import React from "react";

import JobCart from '../Components/JobCart'
import CategoryList from '../Components/CategoryList'
import CompanyCart from '../Components/CompanyCart'

function Home(){
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
   <CategoryList />
    {/* <!-- popular_catagory_area_end  --> */}
   

     {/* <!-- job_listing_area_start  --> */}
     <div className="job_listing_area">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="section_title">
                        <h3>Job Listing</h3>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="brouse_job text-right">
                        <a href="/JobsArea" className="boxed-btn4">Browse More Job</a>
                    </div>
                </div>
            </div>
            <JobCart/>
        </div>
    </div>
    {/* <!-- job_listing_area_end  --> */}

    {/* <!-- job_searcing_wrap  --> */}
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
    {/* <!-- job_searcing_wrap end  --> */}

  <CompanyCart/>

    {/* <!-- testimonial_area  --> */}
    <div className="testimonial_area  ">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="section_title text-center mb-40">
                        <h3>Testimonial</h3>
                    </div>
                    <div className="col-xl-12">
                        <div className="testmonial_active owl-carousel">
                            <div className="single_carousel">
                                <div className="row">
                                    <div className="col-lg-11">
                                        <div className="single_testmonial d-flex align-items-center">
                                            <div className="thumb">
                                                <img src="/assets/img/testmonial/author.png" alt=""/>
                                                <div className="quote_icon">
                                                    <i className="Flaticon flaticon-quote"></i>
                                                </div>
                                            </div>
                                            <div className="info">
                                                <p>"Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering through animal welfare when people might depend on livestock as their only source of income or food.</p>
                                                <span>- Micky Mouse</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single_carousel">
                                <div className="row">
                                    <div className="col-lg-11">
                                        <div className="single_testmonial d-flex align-items-center">
                                            <div className="thumb">
                                                <img src="/assets/img/testmonial/author.png" alt=""/>
                                                <div className="quote_icon">
                                                    <i className="Flaticon flaticon-quote"></i>
                                                </div>
                                            </div>
                                            <div className="info">
                                                <p>"Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering through animal welfare when people might depend on livestock as their only source of income or food.</p>
                                                <span>- Micky Mouse</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                        </div>
                    </div>
                </div>
           
            </div>
        </div>
    </div>
  
    {/* <!-- /testimonial_area  --> */}

  
  
            
    
</div>)
}

export default Home 