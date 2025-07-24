// routes/jobs.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { protect } = require('../middleware/auth');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Employers only)
router.post('/', protect, async (req, res) => {
  try {
    // Add the user who posted the job
    req.body.postedBy = req.user.id;
    
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate('postedBy', 'name company')
      .sort('-createdAt');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add more routes as needed (get single job, update, delete, etc.)

module.exports = router;