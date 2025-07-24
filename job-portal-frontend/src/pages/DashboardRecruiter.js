import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './styles/DashboardRecruiter.css';

const DashboardRecruiter = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    jobType: 'Full-time',
    location: '',
    minSalary: '',
    maxSalary: ''
  });

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs/my-jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load jobs');
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit new job
  const handleSubmitJob = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/jobs', {
        ...formData,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        salaryRange: {
          min: formData.minSalary || undefined,
          max: formData.maxSalary || undefined
        }
      });
      setJobs([...jobs, response.data]);
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        requirements: '',
        jobType: 'Full-time',
        location: '',
        minSalary: '',
        maxSalary: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job');
    }
  };

  if (loading) return <div className="loading">Loading your job postings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="recruiter-dashboard">
      <div className="dashboard-header">
        <h1>Your Job Postings</h1>
        <button 
          className={`toggle-form-btn ${showForm ? 'cancel' : 'add'}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Post New Job'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmitJob} className="job-form">
          <h2>Create New Job Posting</h2>
          
          <div className="form-group">
            <label>Job Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              required
            />
          </div>

          <div className="form-group">
            <label>Requirements (one per line)*</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={5}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Type*</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Min Salary ($)</label>
              <input
                type="number"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Max Salary ($)</label>
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Post Job</button>
        </form>
      )}

      <div className="jobs-list">
        {jobs.length === 0 ? (
          <div className="empty-state">
            <p>You haven't posted any jobs yet</p>
            <button 
              className="add-job-btn"
              onClick={() => setShowForm(true)}
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <span className={`job-type ${job.jobType.toLowerCase()}`}>
                  {job.jobType}
                </span>
              </div>
              <p className="company-location">
                {job.company} • {job.location}
              </p>
              <p className="salary">
                {job.salaryRange?.min ? `$${job.salaryRange.min} - $${job.salaryRange.max}` : 'Salary not specified'}
              </p>
              <div className="job-footer">
                <button 
                  className="view-applicants"
                  onClick={() => navigate(`/jobs/${job._id}/applications`)}
                >
                  View Applicants ({job.applications?.length || 0})
                </button>
                <span className="post-date">
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardRecruiter;