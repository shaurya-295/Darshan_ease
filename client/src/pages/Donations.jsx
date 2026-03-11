import React, { useEffect, useState } from 'react';
import { getTemples, createDonation, getMyDonations } from '../services/api';
import { toast } from 'react-toastify';

export default function Donations() {
  const [temples, setTemples] = useState([]);
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({ templeId: '', amount: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTemples().then(r => setTemples(r.data.data)).catch(() => {});
    getMyDonations().then(r => setDonations(r.data.data)).catch(() => {});
  }, []);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!form.templeId || !form.amount) return toast.error('Select temple and amount');
    setLoading(true);
    try {
      await createDonation(form);
      toast.success('Donation successful! 🙏 Jai Mata Di');
      setForm({ templeId: '', amount: '', message: '' });
      const res = await getMyDonations();
      setDonations(res.data.data);
    } catch (err) { toast.error(err.response?.data?.message || 'Donation failed'); }
    finally { setLoading(false); }
  };

  const presets = [51, 101, 251, 501, 1001, 5001];

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', paddingTop: 40 }}>
      <div className="container py-4">
        <h2 style={{ fontFamily: 'serif', color: '#7B1414' }}>💛 Temple Donations</h2>
        <p className="text-muted mb-4">Contribute to the divine cause and earn blessings</p>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 16 }}>
              <h5 style={{ fontFamily: 'serif', color: '#7B1414' }}>Make a Donation</h5>
              <form onSubmit={handleDonate}>
                <div className="mb-3 mt-3">
                  <label className="form-label fw-bold small text-muted">SELECT TEMPLE</label>
                  <select className="form-select" value={form.templeId} onChange={e => setForm({ ...form, templeId: e.target.value })} required>
                    <option value="">Choose a temple...</option>
                    {temples.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold small text-muted">AMOUNT (₹)</label>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {presets.map(p => (
                      <button key={p} type="button" className="btn btn-sm"
                        style={{ background: form.amount == p ? '#E8891A' : '#FFF0DC', color: form.amount == p ? 'white' : '#8B4500', fontWeight: 700, borderRadius: 8 }}
                        onClick={() => setForm({ ...form, amount: p })}>₹{p}</button>
                    ))}
                  </div>
                  <input type="number" className="form-control" placeholder="Or enter custom amount"
                    value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} min="1" required />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold small text-muted">MESSAGE (optional)</label>
                  <textarea className="form-control" rows={2} placeholder="A message or prayer..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} maxLength={200} />
                </div>
                <button className="btn w-100 fw-bold" type="submit" disabled={loading}
                  style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 10, padding: 12 }}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2" /> : '💛 '}
                  Donate with Blessings
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-7">
            <h5 style={{ fontFamily: 'serif', color: '#7B1414' }}>My Donation History</h5>
            {donations.length === 0 ? (
              <div className="text-center py-4 text-muted">No donations yet</div>
            ) : donations.map(d => (
              <div key={d._id} className="card border-0 shadow-sm mb-3" style={{ borderRadius: 12, borderLeft: '4px solid #E8891A' }}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">{d.templeId?.name}</div>
                    <div className="small text-muted">{new Date(d.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</div>
                    {d.message && <div className="small fst-italic text-muted">"{d.message}"</div>}
                  </div>
                  <div className="fw-bold text-warning fs-5">₹{d.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
