import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTemple, getSlotsByTemple, createBooking } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function TempleDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({ devoteeName: '', phone: '', tickets: 1, poojaType: 'General Darshan' });

  useEffect(() => { fetchTemple(); }, [id]);
  useEffect(() => { if (temple) fetchSlots(); }, [date, temple]);

  const fetchTemple = async () => {
    try {
      const res = await getTemple(id);
      setTemple(res.data.data);
    } catch { toast.error('Temple not found'); }
    finally { setLoading(false); }
  };

  const fetchSlots = async () => {
    try {
      const res = await getSlotsByTemple(id, date);
      setSlots(res.data.data);
    } catch { toast.error('Failed to load slots'); }
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    if (!selectedSlot) { toast.error('Please select a time slot'); return; }
    setBooking(true);
    try {
      const res = await createBooking({
        slotId: selectedSlot._id,
        templeId: id,
        devoteeName: form.devoteeName,
        phone: form.phone,
        tickets: Number(form.tickets),
        poojaType: form.poojaType,
        visitDate: date,
        visitTime: selectedSlot.time,
      });
      toast.success(`Booking confirmed! Ref: ${res.data.data.bookingRef} 🙏`);
      setShowModal(false);
      fetchSlots();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally { setBooking(false); }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-warning" /></div>;
  if (!temple) return <div className="text-center mt-5 text-muted">Temple not found</div>;

  const totalAmount = (selectedSlot?.price || 0) * form.tickets + 5;

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', paddingTop: 40 }}>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
              <div style={{ height: 200, background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', borderRadius: '16px 16px 0 0' }}>🛕</div>
              <div className="card-body">
                <h3 style={{ fontFamily: 'serif', color: '#7B1414' }}>{temple.name}</h3>
                <p className="text-muted">📍 {temple.location}</p>
                {temple.deity && <p><strong>Deity:</strong> {temple.deity}</p>}
                {temple.timings && <p><strong>Timings:</strong> {temple.timings}</p>}
                {temple.description && <p className="text-muted small">{temple.description}</p>}
                {(temple.tags || []).map(t => (
                  <span key={t} className="badge me-1 mb-1" style={{ background: '#FFF0DC', color: '#8B4500' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 16 }}>
              <h4 style={{ fontFamily: 'serif', color: '#7B1414' }}>Available Darshan Slots</h4>
              <div className="d-flex align-items-center gap-3 my-3">
                <label className="fw-bold small text-muted">SELECT DATE:</label>
                <input type="date" className="form-control w-auto"
                  min={new Date().toISOString().split('T')[0]}
                  value={date} onChange={e => setDate(e.target.value)} />
              </div>

              {slots.length === 0 ? (
                <div className="text-center py-4 text-muted">No slots available for this date</div>
              ) : (
                <div className="row g-2">
                  {slots.map(slot => (
                    <div className="col-md-4 col-sm-6" key={slot._id}>
                      <div className={`p-3 rounded-3 border-2 border text-center cursor-pointer ${selectedSlot?._id === slot._id ? 'border-warning bg-warning bg-opacity-10' : 'border-light bg-white'}`}
                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => slot.availableSeats > 0 && setSelectedSlot(slot)}>
                        <div className="fw-bold">{slot.time}</div>
                        <div className="small text-muted">{slot.poojaType}</div>
                        <div className="small" style={{ color: slot.availableSeats > 0 ? '#2E7D32' : '#C62828' }}>
                          {slot.availableSeats > 0 ? `${slot.availableSeats} seats` : 'Full'}
                        </div>
                        <div className="fw-bold text-warning">{slot.price > 0 ? `₹${slot.price}` : 'Free'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedSlot && (
                <div className="mt-4">
                  <div className="alert" style={{ background: '#FFF8EE', border: '1px solid #FFDCA0', borderRadius: 10 }}>
                    <strong>Selected:</strong> {selectedSlot.time} — {selectedSlot.poojaType} · {selectedSlot.price > 0 ? `₹${selectedSlot.price}/ticket` : 'Free'}
                  </div>
                  <button className="btn btn-lg fw-bold" style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 10 }}
                    onClick={() => { if (!user) { navigate('/login'); } else setShowModal(true); }}>
                    🙏 Book This Slot
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card border-0 shadow-lg p-4" style={{ maxWidth: 500, width: '100%', borderRadius: 20, maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontFamily: 'serif', color: '#7B1414' }}>Confirm Booking</h4>
              <button className="btn-close" onClick={() => setShowModal(false)} />
            </div>
            <p className="text-muted small mb-3">🛕 {temple.name} · {selectedSlot.time} · {date}</p>
            <form onSubmit={handleBook}>
              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">DEVOTEE NAME</label>
                <input className="form-control" required placeholder="Full name"
                  value={form.devoteeName} onChange={e => setForm({ ...form, devoteeName: e.target.value })} />
              </div>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label fw-bold small text-muted">PHONE</label>
                  <input className="form-control" placeholder="+91..." value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold small text-muted">TICKETS (max 6)</label>
                  <input type="number" className="form-control" min="1" max="6" value={form.tickets}
                    onChange={e => setForm({ ...form, tickets: e.target.value })} />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold small text-muted">POOJA TYPE</label>
                <select className="form-select" value={form.poojaType} onChange={e => setForm({ ...form, poojaType: e.target.value })}>
                  <option>General Darshan</option>
                  <option>VIP Darshan</option>
                  <option>Abhishekam</option>
                  <option>Prasad Booking</option>
                </select>
              </div>
              <div className="p-3 rounded-3 mb-3" style={{ background: '#FFF8EE', border: '1px solid #FFDCA0' }}>
                <div className="d-flex justify-content-between small mb-1"><span>Tickets ({form.tickets}×)</span><span>₹{(selectedSlot.price || 0) * form.tickets}</span></div>
                <div className="d-flex justify-content-between small mb-2"><span>Convenience fee</span><span>₹5</span></div>
                <div className="d-flex justify-content-between fw-bold"><span>Total</span><span style={{ color: '#7B1414' }}>₹{totalAmount}</span></div>
              </div>
              <button className="btn w-100 fw-bold" type="submit" disabled={booking}
                style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 10, padding: 12 }}>
                {booking ? <span className="spinner-border spinner-border-sm me-2" /> : null}
                ✓ Confirm Darshan Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
