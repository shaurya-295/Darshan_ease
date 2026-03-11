import React, { useEffect, useState } from 'react';
import { getMyBookings, cancelBooking } from '../services/api';
import { toast } from 'react-toastify';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data.data);
    } catch { toast.error('Failed to load bookings'); }
    finally { setLoading(false); }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled. Seats restored.');
      fetchBookings();
    } catch (err) { toast.error(err.response?.data?.message || 'Cancel failed'); }
  };

  const statusColor = { CONFIRMED: '#2E7D32', CANCELLED: '#C62828', COMPLETED: '#1565C0' };

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', paddingTop: 40 }}>
      <div className="container py-4">
        <h2 style={{ fontFamily: 'serif', color: '#7B1414' }}>🎟️ My Bookings</h2>
        <p className="text-muted mb-4">Manage all your darshan bookings</p>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning" /></div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem' }}>🛕</div>
            <h5 className="text-muted mt-3">No bookings yet</h5>
            <a href="/temples" className="btn mt-2" style={{ background: '#E8891A', color: 'white' }}>Explore Temples</a>
          </div>
        ) : (
          <div className="row g-4">
            {bookings.map(b => (
              <div className="col-md-6" key={b._id}>
                <div className="card border-0 shadow-sm" style={{ borderRadius: 16, borderLeft: `4px solid ${statusColor[b.status]}` }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 style={{ fontFamily: 'serif', color: '#7B1414' }}>{b.templeId?.name || 'Temple'}</h5>
                      <span className="badge px-3 py-2" style={{ background: statusColor[b.status], fontSize: '0.75rem' }}>{b.status}</span>
                    </div>
                    <p className="text-muted small mb-1">📍 {b.templeId?.location}</p>
                    <p className="small mb-1">📅 {b.visitDate ? new Date(b.visitDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : 'N/A'} · {b.visitTime}</p>
                    <p className="small mb-1">🙏 {b.devoteeName} · {b.tickets} ticket(s)</p>
                    <p className="small mb-2">🕌 {b.poojaType}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <code style={{ background: '#FFF0DC', color: '#8B4500', padding: '4px 10px', borderRadius: 6, fontSize: '0.8rem' }}>{b.bookingRef}</code>
                      <span className="fw-bold">₹{b.totalAmount}</span>
                    </div>
                    {b.status === 'CONFIRMED' && (
                      <button className="btn btn-sm w-100 mt-3 fw-bold" style={{ border: '2px solid #C62828', color: '#C62828', borderRadius: 8 }}
                        onClick={() => handleCancel(b._id)}>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
