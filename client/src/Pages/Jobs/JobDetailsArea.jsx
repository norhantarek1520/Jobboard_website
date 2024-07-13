import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicationCart  from "../../Components/ApplicationCart"
function JobDetailsArea() {
    const [jobDetails, setJobDetails] = useState({});
    const jobId = localStorage.getItem('jobId'); // Retrieve job ID from local storage

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (jobId) {
                try {
                    const response = await axios.get(`http://localhost:5001/jobs/${jobId}`);
                    setJobDetails(response.data);
                } catch (error) {
                    console.error('Error fetching job details:', error);
                    // Handle errors gracefully (e.g., display an error message)
                }
            }
        };

        fetchJobDetails();
    }, [jobId]);
    return (

        <div>
            {/* <!-- bradcam_area  --> */}
            <div className="bradcam_area bradcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text">
                                <h3>{jobDetails.title}</h3> {/* Dynamically set job title */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--/ bradcam_area  --> */}

            {/* <!-- job_listing_area_start  --> */}
            {jobDetails.id && ( // Conditionally render content only if job details are available
                <div className="job_details_area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="job_details_header">
                                    <div className="single_jobs white-bg d-flex justify-content-between">
                                        <div className="jobs_left d-flex align-items-center">
                                            <div className="thumb">
                                                <img src="assets/img/svg_icon/1.svg" alt="" />
                                            </div>
                                            <div className="jobs_conetent">
                                                <a href="#">
                                                    <h4>{jobDetails.title}</h4> {/* Dynamically set job title */}
                                                </a>
                                                <div className="links_locat d-flex align-items-center">
                                                    <div className="location">
                                                        <p>
                                                            <i className="fa fa-map-marker"></i> {jobDetails.location}
                                                        </p>
                                                    </div>
                                                    <div className="location">
                                                        <p>
                                                            <i className="fa fa-clock-o"></i> {jobDetails.job_type}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="jobs_right">
                                            <div className="apply_now">
                                                <a className="heart_mark" href="#">
                                                    <i className="ti-heart"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="descript_wrap white-bg">
                                    {jobDetails.qualifications && ( // Conditionally render sections based on data availability
                                        <div className="single_wrap">
                                            <h4>Qualifications</h4>
                                            <ul>
                                                {jobDetails.qualifications.split('\n').map((qualification) => (
                                                    <li key={qualification}>{qualification}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {jobDetails.responsibility && (
                                        <div className="single_wrap">
                                            <h4>Responsibility</h4>
                                            <ul>
                                                {jobDetails.responsibility.split('\n').map((responsibility) => (
                                                    <li key={responsibility}>{responsibility}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {/* ... similar logic for other job details sections */}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="job_sumary">
                                    <div className="summery_header">
                                        <h3>Job Summery</h3>
                                    </div>
                                    <div className="job_content">
                                        <ul>
                                            <li>Published on: <span>12 Nov, 2019</span></li>
                                            <li>Vacancy: <span>2 Position</span></li>
                                            <li>Salary: <span>50k - 120k/y</span></li>
                                            <li>Location: <span>California, USA</span></li>
                                            <li>Job Nature: <span> Full-time</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="share_wrap d-flex">
                                    <span>Share at:</span>
                                    <ul>
                                        <li><a href="#"> <i className="fa fa-facebook"></i></a> </li>
                                        <li><a href="#"> <i className="fa fa-google-plus"></i></a> </li>
                                        <li><a href="#"> <i className="fa fa-twitter"></i></a> </li>
                                        <li><a href="#"> <i className="fa fa-envelope"></i></a> </li>
                                    </ul>
                                </div>

                            </div>

                        </div>

                    </div></div>
        
            )
            }
            <ApplicationCart/>

        </div>)
}

export default JobDetailsArea 