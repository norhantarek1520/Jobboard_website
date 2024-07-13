import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false); // State to handle loading indicator

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}` };
                const response = await axios.get('http://localhost:5001/users/myprofile', { headers });
                setUsers(response.data.user);
               
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>

            <div className="bradcam_area bradcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text">
                                <h3>User Profile</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        {loading == false ? (
            <section style={{ backgroundColor: '#eee' }}>
                <div class="container py-5">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="card mb-4">
                                <div class="card-body text-center">
                                    <img
                                        src={
                                            users.gender === 'female'
                                                ? 'https://cdn3.iconfinder.com/data/icons/avatars-business-human1/180/woman1-512.png'
                                                : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                                        }
                                        alt="avatar"
                                        className="rounded-circle img-fluid"
                                        style={{ width: '150px' }}
                                    />
                                    <h5 className="my-3">{users.name}</h5>
                                    <p className="text-muted mb-1">{users.job_title}</p>
                                    <p className="text-muted mb-4">{users.education}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{users.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{users.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Age</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{users.age}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Gender</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{users.gender}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{users.phone_number}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{users.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section> 
            ): (
                <p>Loading ...</p>
              ) }



        </div>);
}

export default UserProfile;
