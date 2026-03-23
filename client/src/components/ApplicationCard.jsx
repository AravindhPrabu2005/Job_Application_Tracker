export default function ApplicationCard({ app, onDelete, onStatusChange }) {
  const priorityConfig = {
    'Dream Company': { bg: '#fff3e0', border: '#fb8c00', badge: '#fb8c00', text: '#e65100' },
    'High':          { bg: '#fce4ec', border: '#e91e63', badge: '#e91e63', text: '#880e4f' },
    'Medium':        { bg: '#e8eaf6', border: '#3f51b5', badge: '#3f51b5', text: '#1a237e' },
    'Low':           { bg: '#f1f8e9', border: '#7cb342', badge: '#7cb342', text: '#33691e' },
  };

  const statusColors = {
    'Offer Received':    '#2e7d32',
    'Rejected':          '#c62828',
    'OA Scheduled':      '#f57f17',
    'OA Completed':      '#ef6c00',
    'Interview Round 1': '#6a1b9a',
    'Interview Round 2': '#4a148c',
    'HR Round':          '#00695c',
    'Applied':           '#1565c0',
    'Withdrawn':         '#757575',
    'Bookmarked':        '#4e342e',
  };

  const config = priorityConfig[app.priority] || priorityConfig['Low'];
  const statusColor = statusColors[app.status] || '#1565c0';

  return (
    <div style={{
      background: config.bg,
      border: `1.5px solid ${config.border}`,
      borderRadius: '10px',
      padding: '12px 14px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
    }}>

      {/* Row 1 — Company + Priority Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', color: '#1a1a2e', fontWeight: 700 }}>
          {app.company}
        </h3>
        <span style={{
          background: config.badge, color: '#fff',
          fontSize: '11px', padding: '2px 8px',
          borderRadius: '20px', fontWeight: 600
        }}>
          {app.priority}
        </span>
      </div>

      {/* Row 2 — Role + Job Type */}
      <p style={{ margin: '2px 0 6px', fontSize: '13px', color: '#555' }}>
        💼 {app.role} &nbsp;·&nbsp; 🏢 {app.jobType} &nbsp;·&nbsp; 📍 {app.location || 'N/A'}
      </p>

      {/* Row 3 — Applied Date + Package */}
      <p style={{ margin: '2px 0', fontSize: '12px', color: '#666' }}>
        📅 {new Date(app.appliedDate).toLocaleDateString('en-IN')}
        {app.packageLPA ? `  ·  💰 ${app.packageLPA} LPA` : ''}
        {app.jobLink
          ? <> &nbsp;·&nbsp; <a href={app.jobLink} target="_blank" rel="noreferrer"
              style={{ color: '#3f51b5', fontSize: '12px' }}>🔗 Link</a></>
          : ''}
      </p>

      {/* Row 4 — OA Info (only if present) */}
      {app.oaPlatform && (
        <p style={{ margin: '2px 0', fontSize: '12px', color: '#666' }}>
          💻 {app.oaPlatform} {app.oaDifficulty ? `· ${app.oaDifficulty}` : ''}
          {app.oaNotes ? ` · ${app.oaNotes}` : ''}
        </p>
      )}

      {/* Row 5 — DSA Topics (only if present) */}
      {app.dsaTopicsAsked?.length > 0 && (
        <div style={{ margin: '6px 0', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {app.dsaTopicsAsked.map(topic => (
            <span key={topic} style={{
              background: '#e3f2fd', color: '#1565c0',
              fontSize: '11px', padding: '2px 8px',
              borderRadius: '20px', border: '1px solid #90caf9'
            }}>
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '8px 0' }} />

      {/* Row 6 — Status Dropdown + Delete */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <select
          value={app.status}
          onChange={e => onStatusChange(app._id, e.target.value)}
          style={{
            padding: '4px 8px', borderRadius: '6px', fontSize: '12px',
            border: `1.5px solid ${statusColor}`, color: statusColor,
            background: '#fff', fontWeight: 600, cursor: 'pointer'
          }}>
          {['Bookmarked','Applied','OA Scheduled','OA Completed',
            'Interview Round 1','Interview Round 2','HR Round',
            'Offer Received','Rejected','Withdrawn']
            .map(s => <option key={s} style={{ color: '#333' }}>{s}</option>)}
        </select>

        <button
          onClick={() => onDelete(app._id)}
          style={{
            background: '#fce4ec', color: '#c62828',
            border: '1px solid #ef9a9a', borderRadius: '6px',
            padding: '4px 10px', fontSize: '12px', cursor: 'pointer'
          }}>
          🗑 Delete
        </button>
      </div>

    </div>
  );
}
