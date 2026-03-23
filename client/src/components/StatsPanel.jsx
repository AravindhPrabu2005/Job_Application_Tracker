export default function StatsPanel({ stats }) {
  const cards = [
    { label: '📋 Total', value: stats.total, color: '#6366f1' },
    { label: '📨 Applied', value: stats.applied, color: '#3b82f6' },
    { label: '💻 OA Pending', value: stats.oaScheduled, color: '#f59e0b' },
    { label: '🎤 Interviewing', value: stats.interviewing, color: '#8b5cf6' },
    { label: '🎉 Offers', value: stats.offers, color: '#10b981' },
    { label: '❌ Rejected', value: stats.rejected, color: '#ef4444' },
    { label: '⭐ Dream Co.', value: stats.dreamCompanies, color: '#f97316' },
  ];

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
      {cards.map(c => (
        <div key={c.label} style={{
          background: c.color, color: '#fff', padding: '16px 20px',
          borderRadius: '12px', minWidth: '120px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{c.value ?? 0}</div>
          <div style={{ fontSize: '13px' }}>{c.label}</div>
        </div>
      ))}
    </div>
  );
}
