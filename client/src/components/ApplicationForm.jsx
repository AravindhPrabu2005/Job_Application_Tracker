import { useState } from 'react';
import axios from 'axios';

export default function ApplicationForm({ token, onClose, onAdded }) {
  const [form, setForm] = useState({
    company: '', role: 'SDE Intern', location: '', jobType: 'Internship',
    jobSource: 'LinkedIn', jobLink: '', status: 'Applied', priority: 'Medium',
    oaPlatform: '', oaDifficulty: '', oaNotes: '', packageLPA: '',
    dsaTopicsAsked: '', notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/applications', {
      ...form,
      dsaTopicsAsked: form.dsaTopicsAsked.split(',').map(t => t.trim()).filter(Boolean),
      packageLPA: form.packageLPA ? Number(form.packageLPA) : undefined,
    }, { headers: { Authorization: `Bearer ${token}` } });
    onAdded();
  };

  const field = (label, key, type = 'text', options = null) => (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', marginBottom: '4px', color: '#cdd6f4' }}>{label}</label>
      {options
        ? <select value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '6px' }}>
            {options.map(o => <option key={o}>{o}</option>)}
          </select>
        : <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '6px' }} />}
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <form onSubmit={handleSubmit} style={{ background: '#1e1e2e', padding: '28px', borderRadius: '16px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h3 style={{ color: '#cdd6f4', marginBottom: '16px' }}>➕ New Job Application</h3>
        {field('Company *', 'company')}
        {field('Role', 'role', 'text', ['SDE Intern', 'SDE-1', 'SDE-2', 'Full Stack Intern', 'Backend Intern', 'Frontend Intern'])}
        {field('Location', 'location')}
        {field('Job Type', 'jobType', 'text', ['Internship', 'Full-Time', 'Contract'])}
        {field('Job Source', 'jobSource', 'text', ['LinkedIn', 'Naukri', 'Campus', 'Referral', 'AngelList', 'Company Website'])}
        {field('Job Link', 'jobLink')}
        {field('Priority', 'priority', 'text', ['Low', 'Medium', 'High', 'Dream Company'])}
        {field('OA Platform', 'oaPlatform', 'text', ['HackerRank', 'Codility', 'LeetCode', 'HackerEarth', 'Unstop', 'Other'])}
        {field('OA Difficulty', 'oaDifficulty', 'text', ['Easy', 'Medium', 'Hard'])}
        {field('OA Notes (e.g., 2 DSA + SQL, 90min)', 'oaNotes')}
        {field('DSA Topics Asked (comma-separated)', 'dsaTopicsAsked')}
        {field('Package (LPA)', 'packageLPA', 'number')}
        {field('Notes', 'notes')}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
          <button type="submit" style={{ padding: '8px 16px', background: '#6366f1', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Save</button>
        </div>
      </form>
    </div>
  );
}
