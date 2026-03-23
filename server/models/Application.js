const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Company & Role
  company: { type: String, required: true },
  role: { type: String, required: true },         // e.g., "SDE Intern", "SDE-1"
  location: String,                               // e.g., "Bangalore", "Remote"
  jobType: {
    type: String,
    enum: ['Internship', 'Full-Time', 'Contract'],
    default: 'Full-Time'
  },
  jobSource: String,   // e.g., "LinkedIn", "Naukri", "Campus", "Referral"
  jobLink: String,

  // Application Stage — SDE hiring pipeline
  status: {
    type: String,
    enum: [
      'Bookmarked',
      'Applied',
      'OA Scheduled',
      'OA Completed',
      'Interview Round 1',
      'Interview Round 2',
      'HR Round',
      'Offer Received',
      'Rejected',
      'Withdrawn'
    ],
    default: 'Applied'
  },

  // Dates
  appliedDate: { type: Date, default: Date.now },
  oaDate: Date,
  interviewDate: Date,
  followUpDate: Date,

  // OA-specific (important for SDE freshers!)
  oaPlatform: String,    // e.g., "HackerRank", "Codility", "LeetCode"
  oaDifficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  oaNotes: String,       // e.g., "2 DSA + 1 SQL, 90 min"

  // Interview Notes
  interviewNotes: String,
  interviewType: {
    type: String,
    enum: ['Technical', 'HR', 'Managerial', 'System Design']
  },
  dsaTopicsAsked: [String],   // e.g., ["DP", "Trees", "Graphs"]

  // Offer Details
  packageLPA: Number,          // Salary in LPA (very relevant in India)
  offerDeadline: Date,

  // General
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Dream Company'],
    default: 'Medium'
  },
  notes: String,
  isFavorite: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
