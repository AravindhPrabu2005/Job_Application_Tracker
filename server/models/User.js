const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: String, default: 'SREC' },
  targetRole: { type: String, default: 'SDE' },
  skills: [String],
  leetcodeUsername: String,
  resumeLink: String,
  githubLink: String,
}, { timestamps: true });

// ✅ Removed (next) — Mongoose 7+ is Promise-based
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', UserSchema);
