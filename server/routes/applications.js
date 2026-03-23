const router = require('express').Router();
const Application = require('../models/Application');
const auth = require('../middleware/authMiddleware');

// Get all applications for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, jobType, search, sortBy } = req.query;
    let filter = { user: req.user.id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (jobType) filter.jobType = jobType;
    if (search) filter.company = { $regex: search, $options: 'i' };

    const sortOptions = {
      'date_desc': { appliedDate: -1 },
      'date_asc': { appliedDate: 1 },
      'priority': { priority: -1 },
    };

    const apps = await Application.find(filter).sort(sortOptions[sortBy] || { createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add application
router.post('/', auth, async (req, res) => {
  try {
    const app = await Application.create({ ...req.body, user: req.user.id });
    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update application
router.put('/:id', auth, async (req, res) => {
  try {
    const app = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!app) return res.status(404).json({ message: 'Not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete application
router.delete('/:id', auth, async (req, res) => {
  try {
    await Application.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Stats for dashboard
router.get('/stats', auth, async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id });
    const stats = {
      total: apps.length,
      applied: apps.filter(a => a.status === 'Applied').length,
      oaScheduled: apps.filter(a => a.status === 'OA Scheduled').length,
      interviewing: apps.filter(a => ['Interview Round 1','Interview Round 2','HR Round'].includes(a.status)).length,
      offers: apps.filter(a => a.status === 'Offer Received').length,
      rejected: apps.filter(a => a.status === 'Rejected').length,
      dreamCompanies: apps.filter(a => a.priority === 'Dream Company').length,
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
