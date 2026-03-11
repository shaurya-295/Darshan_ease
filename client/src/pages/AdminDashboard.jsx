import React, { useEffect, useState } from 'react';
import { getAllBookings, getTemples, createTemple, deleteTemple } from '../services/api';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [temples, setTemples] = useState([]);
  const [tab, setTab] = useState('bookings');
  const [newTemple, setNewTemple] = useState({ name: '', location: '', state: '', deity: '', region: 'North India', timings: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllBookings(), getTemples()])
      .then(([b, t]) => { setBookings(b.data.data); setTemples(t.data.data); })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  const handleAddTemple = async (e) => {
    e.preventDefault();
    try {
      const res = await createTemple(newTemple);
      setTemples([res.data.data, ...temples]);
      setNewTemple({ name: '', location: '', state: '', deity: '', region: 'North India', timings: '', description: '' });
      toast.success('Temple added!');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDeleteTemple = async (id) => {
    if (!window.confirm('Remove this temple?')) return;
    try {
      await deleteTemple(id);
      setTemples(temples.filter(t => t._id !== id));
      toast.success('Temple removed');
    } catch { toast.error('Failed to delete'); }
  };

  const statusColor = { CONFIRMED: 'success', CANCELLED: 'danger', COMPLETED: 'primary' };

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', paddingTop: 40 }}>
      <div className="container py-4">
        <h2 style={{ fontFamily: 'serif', color: '#7B1414' }}>⚙️ Admin Dashboard</h2>

        {/* Stats */}
        <div className="row g-3 mb-4 mt-2">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: '🎟️' },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'CONFIRMED').length, icon: '✅' },
            { label: 'Total Temples', value: temples.length, icon: '🛕' },
            { label: 'Total Revenue', value: `₹${bookings.reduce((s, b) => s + (b.totalAmount || 0), 0)}`, icon: '💰' },
          ].map(s => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className="card border-0 shadow-sm text-center p-3" style={{ borderRadius: 14 }}>
                <div style={{ fontSize: '2rem' }}>{s.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7B1414' }}>{s.value}</div>
                <div className="text-muted small">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          {['bookings', 'temples', 'add-temple'].map(t => (
            <li className="nav-item" key={t}>
              <button className={`nav-link fw-bold ${tab === t ? 'active text-warning' : 'text-muted'}`}
                onClick={() => setTab(t)}>
                {t === 'bookings' ? '🎟️ Bookings' : t === 'temples' ? '🛕 Temples' : '➕ Add Temple'}
              </button>
            </li>
          ))}
        </ul>

        {loading ? <div className="text-center py-4"><div className="spinner-border text-warning" /></div> : (
          <>
            {tab === 'bookings' && (
              <div className="table-responsive">
                <table className="table table-hover bg-white rounded-3 overflow-hidden shadow-sm">
                  <thead style={{ background: '#7B1414', color: 'white' }}>
                    <tr><th>Ref</th><th>User</th><th>Temple</th><th>Date</th><th>Tickets</th><th>Amount</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b._id}>
                        <td><code style={{ color: '#8B4500' }}>{b.bookingRef}</code></td>
                        <td>{b.userId?.name}</td>
                        <td>{b.templeId?.name}</td>
                        <td>{b.visitDate ? new Date(b.visitDate).toLocaleDateString('en-IN') : '—'}</td>
                        <td>{b.tickets}</td>
                        <td>₹{b.totalAmount}</td>
                        <td><span className={`badge bg-${statusColor[b.status]}`}>{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'temples' && (
              <div className="row g-3">
                {temples.map(t => (
                  <div className="col-md-4" key={t._id}>
                    <div className="card border-0 shadow-sm p-3" style={{ borderRadius: 12 }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 style={{ fontFamily: 'serif', color: '#7B1414', marginBottom: 2 }}>{t.name}</h6>
                          <p className="text-muted small mb-1">📍 {t.location}</p>
                          <span className="badge" style={{ background: '#FFF0DC', color: '#8B4500' }}>{t.region}</span>
                        </div>
                        <button className="btn btn-sm" style={{ color: '#C62828', border: '1px solid #C62828', borderRadius: 8 }}
                          onClick={() => handleDeleteTemple(t._id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'add-temple' && (
              <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 16, maxWidth: 600 }}>
                <h5 style={{ fontFamily: 'serif', color: '#7B1414' }}>Add New Temple</h5>
                <form onSubmit={handleAddTemple} className="mt-3">
                  <div className="row g-3">
                    <div className="col-md-6"><label className="form-label fw-bold small text-muted">TEMPLE NAME</label><input className="form-control" required value={newTemple.name} onChange={e => setNewTemple({ ...newTemple, name: e.target.value })} /></div>
                    <div className="col-md-6"><label className="form-label fw-bold small text-muted">CITY / LOCATION</label><input className="form-control" required value={newTemple.location} onChange={e => setNewTemple({ ...newTemple, location: e.target.value })} /></div>
                    <div className="col-md-6"><label className="form-label fw-bold small text-muted">DEITY</label><input className="form-control" value={newTemple.deity} onChange={e => setNewTemple({ ...newTemple, deity: e.target.value })} /></div>
                    <div className="col-md-6"><label className="form-label fw-bold small text-muted">REGION</label>
                      <select className="form-select" value={newTemple.region} onChange={e => setNewTemple({ ...newTemple, region: e.target.value })}>
                        {['North India', 'South India', 'West India', 'East India'].map(r => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="col-12"><label className="form-label fw-bold small text-muted">TIMINGS</label><input className="form-control" placeholder="e.g. 6:00 AM – 8:00 PM" value={newTemple.timings} onChange={e => setNewTemple({ ...newTemple, timings: e.target.value })} /></div>
                    <div className="col-12"><label className="form-label fw-bold small text-muted">DESCRIPTION</label><textarea className="form-control" rows={3} value={newTemple.description} onChange={e => setNewTemple({ ...newTemple, description: e.target.value })} /></div>
                  </div>
                  <button className="btn mt-4 fw-bold" type="submit" style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 10, padding: '10px 30px' }}>
                    ➕ Add Temple
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
