import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import './styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'job_seeker'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      const res = await axios.post('/auth', formData);
      console.log('Registration success:', res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      setErrors({
        message: err.response?.data?.details || 
                err.response?.data?.error || 
                'Registration failed. Please try again.'
      });
    }
  };

  return (
    <div className="register-portal">
      <div className="register-card">
        <h2>Create Your Account</h2>
        
        {errors.message && (
          <div className="error-message">{errors.message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
            />
          </div>

          <div className="role-selection">
            <p>Register As</p>
            <div className="role-options">
              <label className={formData.role === 'job_seeker' ? 'active' : ''}>
                <input
                  type="radio"
                  name="role"
                  value="job_seeker"
                  checked={formData.role === 'job_seeker'}
                  onChange={handleChange}
                />
                Job Seeker
              </label>
              <label className={formData.role === 'recruiter' ? 'active' : ''}>
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={formData.role === 'recruiter'}
                  onChange={handleChange}
                />
                Recruiter
              </label>
            </div>
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;