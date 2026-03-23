import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 32px', background: '#181825', borderBottom: '1px solid #313244'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '22px' }}>🎯</span>
        <Link to="/" style={{ color: '#cdd6f4', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
          JobTrackr
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user ? (
          <>
            <span style={{ color: '#a6adc8', fontSize: '14px' }}>
              👤 {user.name}
            </span>
            <Link to="/profile" style={{ color: '#89b4fa', textDecoration: 'none', fontSize: '14px' }}>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: '6px 16px', background: '#f38ba8', color: '#1e1e2e',
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
              }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#89b4fa', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#89b4fa', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
