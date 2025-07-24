import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const JobForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    jobType: 'Full-time',
    location: '',
    minSalary: '',
    maxSalary: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.minSalary && isNaN(formData.minSalary)) newErrors.minSalary = 'Must be a number';
    if (formData.maxSalary && isNaN(formData.maxSalary)) newErrors.maxSalary = 'Must be a number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      await api.post('/jobs', {
        ...formData,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        salaryRange: {
          min: formData.minSalary || undefined,
          max: formData.maxSalary || undefined
        }
      });
      onSubmit();
      navigate('/jobs'); // Redirect after successful submission
    } catch (err) {
      alert(err.response?.data?.error || 'Error posting job');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <div className="form-group">
        <label>Job Title*</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Description*</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label>Requirements (one per line)</label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={5}
          placeholder="Enter each requirement on a new line"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Job Type*</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
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
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? 'error' : ''}
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Min Salary ($)</label>
          <input
            type="number"
            name="minSalary"
            value={formData.minSalary}
            onChange={handleChange}
            className={errors.minSalary ? 'error' : ''}
          />
          {errors.minSalary && <span className="error-message">{errors.minSalary}</span>}
        </div>

        <div className="form-group">
          <label>Max Salary ($)</label>
          <input
            type="number"
            name="maxSalary"
            value={formData.maxSalary}
            onChange={handleChange}
            className={errors.maxSalary ? 'error' : ''}
          />
          {errors.maxSalary && <span className="error-message">{errors.maxSalary}</span>}
        </div>
      </div>

      <button type="submit" className="submit-btn">Post Job</button>
    </form>
  );
};

export default JobForm;