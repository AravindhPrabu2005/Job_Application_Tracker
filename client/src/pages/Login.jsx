import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#11111b',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#1e1e2e', padding: '40px', borderRadius: '16px',
        width: '380px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '36px' }}>🎯</span>
          <h2 style={{ color: '#cdd6f4', margin: '8px 0 4px' }}>Welcome Back</h2>
          <p style={{ color: '#6c7086', fontSize: '14px' }}>Track your SDE job hunt</p>
        </div>

        {error && (
          <div style={{
            background: '#f38ba820', border: '1px solid #f38ba8',
            color: '#f38ba8', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#a6adc8', fontSize: '14px', display: 'block', marginBottom: '6px' }}>Email</label>
          <input
            type="email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            style={{
              width: '100%', padding: '10px 12px', background: '#313244',
              border: '1px solid #45475a', borderRadius: '8px', color: '#cdd6f4',
              fontSize: '14px', boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#a6adc8', fontSize: '14px', display: 'block', marginBottom: '6px' }}>Password</label>
          <input
            type="password" required value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            style={{
              width: '100%', padding: '10px 12px', background: '#313244',
              border: '1px solid #45475a', borderRadius: '8px', color: '#cdd6f4',
              fontSize: '14px', boxSizing: 'border-box'
            }}
          />
        </div>

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '12px', background: '#6366f1', color: '#fff',
          border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px',
          cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1
        }}>
          {loading ? 'Logging in...' : 'Login →'}
        </button>

        <p style={{ color: '#6c7086', textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          No account?{' '}
          <Link to="/register" style={{ color: '#89b4fa', textDecoration: 'none' }}>Register here</Link>
        </p>
      </form>
    </div>
  );
}
