import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function EditUserProfile({ userId }) {
  const [user, setUser] = useState({});
  const [oldUserData, setOldUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}` };
        const response = await axios.get('http://localhost:5001/users/myprofile', { headers });
        setOldUserData(response.data.user);
         
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const headers = { 'authorization': `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.put(`http://localhost:5001/users/update_profile`, user, { headers }); // Replace with your API endpoint
      if (response.status === 200) {
        // Handle successful update (e.g., display success message)
        console.log('User profile updated successfully!');
        navigate('/UserProfile'); 
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (<>

    <div class="bradcam_area bradcam_bg_1">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="bradcam_text">
              <h3> Edit Profile </h3>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div className="container">
      {isLoading && <p>Loading user profile...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <div class="container">
          <div class="row gutters">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div class="card h-100">

                <div class="card-body">
                  <div class="account-settings">

                    <div class="user-profile">

                      <div class="user-avatar text-center">

                        <img src={
                          oldUserData.gender === 'female'
                            ? 'https://cdn3.iconfinder.com/data/icons/avatars-business-human1/180/woman1-512.png'
                            : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                        }
                          class="rounded-circle img-fluid" style={{ width: '150px' }} />


                      </div>
                      <div class="card-body text-center">

                        <h5 className="my-3">{oldUserData.name}</h5>
                        <p className="text-muted mb-1">{oldUserData.email}</p>

                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div class="card h-100">


                <div class="card-body">
                  <div class="row gutters">

                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          name="name"
                          value={user.name }
                          onChange={handleChange}

                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="eMail">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={user.email || oldUserData.email}
                          onChange={handleChange}
                          disabled // Email should not be editable
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">address :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={user.address}
                          onChange={handleChange}

                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="education">education :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="education"
                          name="education"
                          value={user.education }
                          onChange={handleChange}

                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="job_title">job_title :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="job_title"
                          name="job_title"
                          value={user.job_title}
                          onChange={handleChange}

                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="age">age :</label>
                        <input
                          type="text"
                          className="form-control"
                          id="age"
                          name="age"
                          value={user.age }
                          onChange={handleChange}

                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone_number">phone_number :</label>
                        <input
                          type="text"
                          className="form-control"

                          id="phone_number"
                          name="phone_number"
                          value={user.phone_number }
                          onChange={handleChange}

                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="gender">gender :</label>
                        <input
                          type="text"
                          className="form-control"

                          id="gender"
                          name="gender"
                          value={user.gender }
                          onChange={handleChange}

                          required
                        />
                      </div>



                      <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update Profile'}
                      </button>
                    </form>


                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>


      )}
    </div>
  </>

  );
}

export default EditUserProfile;
