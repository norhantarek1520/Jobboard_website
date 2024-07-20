import React, { useState, useEffect } from 'react';
import { useNavigate , Link} from 'react-router-dom'; // For navigation (optional)

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For navigation (optional)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name ,email, password ,confirmPassword }),
            });


            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role); // Add role to local storage
               window.location.href = '/'; // Navigate to home page and reload
            } else {
                setError(`Invalid email or password  || ${response.statusText}`);
              
            }
        } catch (error) {
            console.error('Register error:', error);
            setError('An error occurred during Register. Please try again.');
            window.alert('Server problem in Users service. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (<>
        {/* <!-- bradcam_area  --> */}
        <div className="bradcam_area bradcam_bg_1">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="bradcam_text">
                            <h3>Register </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!--/ bradcam_area  -- --> */}
        {/* Register form with existing styling */}
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card" style={{ "border-radius": "15px;" }}>
                            <div className="card-body p-5">
                                <h2 className="text-uppercase text-center mb-5">Register</h2>

                                <form onSubmit={handleSubmit}>
                                    {/* email and password fields */}
                                    <div className="form-outline mb-4">

                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="name "
                                        />

                                    </div>
                                    <div className="form-outline mb-4">

                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="email"
                                        />

                                    </div>


                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control form-control-lg"
                                            placeholder="Password"
                                        />

                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="form-control form-control-lg"
                                            placeholder="confirm Password"
                                        />

                                    </div>


                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" disabled={loading}>
                                            {loading ? 'Loading...' : 'Register'}
                                        </button>

                                    </div>
                                    <p className="text-center text-muted mt-5 mb-0">
                                        you have an account?{' '}
                                        <Link to='/Login' className="fw-bold text-body">
                                            <u>Login</u>
                                        </Link >
                                    </p>
                                    {error && <p className="error">{error}</p>}
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Register;
