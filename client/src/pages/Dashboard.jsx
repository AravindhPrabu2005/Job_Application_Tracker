import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import StatsPanel from '../components/StatsPanel';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationForm from '../components/ApplicationForm';

const API = 'http://localhost:5000/api';

export default function Dashboard() {
  const { token, user } = useAuth();
  const [apps, setApps] = useState([]);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ status: '', priority: '', jobType: '', search: '' });

  const headers = { Authorization: `Bearer ${token}` };

  const fetchApps = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await axios.get(`${API}/applications?${params}`, { headers });
    setApps(res.data);
  };

  const fetchStats = async () => {
    const res = await axios.get(`${API}/applications/stats`, { headers });
    setStats(res.data);
  };

  useEffect(() => { fetchApps(); fetchStats(); }, [filters]);

  const handleDelete = async (id) => {
    await axios.delete(`${API}/applications/${id}`, { headers });
    fetchApps(); fetchStats();
  };

  const handleStatusChange = async (id, status) => {
    await axios.put(`${API}/applications/${id}`, { status }, { headers });
    fetchApps(); fetchStats();
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#1a1a2e', marginBottom: '20px' }}>👋 Hey {user?.name}! Your SDE Job Hunt</h2>

      <StatsPanel stats={stats} />

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <input
          placeholder="🔍 Search company..."
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}
        />
        <select onChange={e => setFilters({ ...filters, status: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
          <option value="">All Statuses</option>
          {['Applied','OA Scheduled','OA Completed','Interview Round 1',
            'Interview Round 2','HR Round','Offer Received','Rejected'].map(s =>
            <option key={s}>{s}</option>)}
        </select>
        <select onChange={e => setFilters({ ...filters, priority: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
          <option value="">All Priorities</option>
          {['Low','Medium','High','Dream Company'].map(p => <option key={p}>{p}</option>)}
        </select>
        <select onChange={e => setFilters({ ...filters, jobType: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}>
          <option value="">All Types</option>
          {['Internship','Full-Time','Contract'].map(t => <option key={t}>{t}</option>)}
        </select>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '8px 18px', background: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '13px',
            cursor: 'pointer', fontWeight: 600
          }}>
          + Add Application
        </button>
      </div>

      {showForm && (
        <ApplicationForm
          token={token}
          onClose={() => setShowForm(false)}
          onAdded={() => { fetchApps(); fetchStats(); setShowForm(false); }}
        />
      )}

      {/* Cards Grid */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        marginTop: '8px'
      }}>
        {apps.length === 0
          ? <p style={{ color: '#888', fontSize: '14px' }}>No applications yet. Click "+ Add Application" to get started!</p>
          : apps.map(app => (
            <div key={app._id} style={{ width: '320px' }}>
              <ApplicationCard
                app={app}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
