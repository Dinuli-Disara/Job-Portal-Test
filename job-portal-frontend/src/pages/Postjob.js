import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/PostJob.css';

const Postjob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    type: 'Full-time',
    contactEmail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await axios.post('/api/jobs', formData);
      console.log('Job posted successfully:', response.data);
      navigate('/jobs');
    } catch (error) {
      console.error('Error posting job:', error);
      setError('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-job-container">
      <div className="post-job-form-container">
        <div className="post-job-header">
          <div className="post-job-title-bar">
            <h1 className="post-job-title">Post a New Job on JobWell</h1>
            <p className="post-job-subtitle">Fill out the form below to list your job opportunity</p>
          </div>
          
          <form onSubmit={handleSubmit} className="post-job-form">
            {error && (
              <div className="post-job-error">
                <p>{error}</p>
              </div>
            )}

            <div className="post-job-form-grid">
              <div className="post-job-form-group">
                <label htmlFor="title" className="post-job-label">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="post-job-input"
                  required
                />
              </div>

              <div className="post-job-form-group">
                <label htmlFor="company" className="post-job-label">
                  Company Name*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="post-job-input"
                  required
                />
              </div>

              <div className="post-job-form-group">
                <label htmlFor="location" className="post-job-label">
                  Location*
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="post-job-input"
                  required
                />
              </div>

              <div className="post-job-form-group">
                <label htmlFor="salary" className="post-job-label">
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="post-job-input"
                  placeholder="e.g. $50,000 - $70,000"
                />
              </div>

              <div className="post-job-form-group">
                <label htmlFor="type" className="post-job-label">
                  Job Type*
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="post-job-input"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="post-job-form-group">
                <label htmlFor="contactEmail" className="post-job-label">
                  Contact Email*
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="post-job-input"
                  required
                />
              </div>
            </div>

            <div className="post-job-form-group">
              <label htmlFor="description" className="post-job-label">
                Job Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="post-job-textarea"
                rows="5"
                required
              />
            </div>

            <div className="post-job-form-group">
              <label htmlFor="requirements" className="post-job-label">
                Requirements*
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="post-job-textarea"
                rows="5"
                required
              />
            </div>

            <button
              type="submit"
              className="post-job-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Postjob;