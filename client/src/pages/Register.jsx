import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    college: 'SREC',                        // pre-filled for you!
    targetRole: 'SDE',
    skills: 'React, Node.js, MongoDB, AWS, DSA',   // pre-filled based on your stack
    leetcodeUsername: '',
    resumeLink: '',
    githubLink: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({
        ...form,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean)
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', background: '#313244',
    border: '1px solid #45475a', borderRadius: '8px', color: '#cdd6f4',
    fontSize: '14px', boxSizing: 'border-box'
  };

  const labelStyle = { color: '#a6adc8', fontSize: '14px', display: 'block', marginBottom: '6px' };

  const field = (label, key, type = 'text', placeholder = '') => (
    <div style={{ marginBottom: '14px' }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type} value={form[key]} placeholder={placeholder}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        style={inputStyle}
      />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: '#11111b',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1e1e2e', padding: '40px', borderRadius: '16px',
        width: '420px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '36px' }}>🚀</span>
          <h2 style={{ color: '#cdd6f4', margin: '8px 0 4px' }}>Create Account</h2>
          <p style={{ color: '#6c7086', fontSize: '14px' }}>Start tracking your SDE applications</p>
        </div>

        {error && (
          <div style={{
            background: '#f38ba820', border: '1px solid #f38ba8',
            color: '#f38ba8', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {field('Full Name *', 'name', 'text', 'Your Name')}
        {field('Email *', 'email', 'email', 'you@example.com')}
        {field('Password *', 'password', 'password', '••••••••')}

        <hr style={{ border: '1px solid #313244', margin: '16px 0' }} />
        <p style={{ color: '#6c7086', fontSize: '12px', marginBottom: '12px' }}>🎓 Academic & Profile Info</p>

        {field('College', 'college', 'text', 'e.g. SREC')}
        {field('Target Role', 'targetRole', 'text', 'e.g. SDE, Full Stack Dev')}
        {field('Skills (comma-separated)', 'skills', 'text', 'React, Node.js, AWS...')}
        {field('LeetCode Username', 'leetcodeUsername', 'text', 'your_lc_username')}
        {field('Resume Link (Google Drive / Portfolio)', 'resumeLink', 'url', 'https://...')}
        {field('GitHub Profile URL', 'githubLink', 'url', 'https://github.com/...')}

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '12px', background: '#a6e3a1', color: '#1e1e2e',
          border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px',
          cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          marginTop: '8px'
        }}>
          {loading ? 'Creating account...' : 'Register & Start Tracking →'}
        </button>

        <p style={{ color: '#6c7086', textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#89b4fa', textDecoration: 'none' }}>Login here</Link>
        </p>
      </form>
    </div>
  );
}
