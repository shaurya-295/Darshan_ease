import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 🙏');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#1A0A00,#3D1500)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: 420, width: '100%', borderRadius: 20 }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>🛕</div>
          <h2 style={{ fontFamily: 'serif', color: '#7B1414' }}>Welcome Back</h2>
          <p className="text-muted small">Login to manage your darshan bookings</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small text-muted">EMAIL ADDRESS</label>
            <input type="email" className="form-control" placeholder="your@email.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold small text-muted">PASSWORD</label>
            <input type="password" className="form-control" placeholder="Enter password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn w-100 fw-bold" type="submit" disabled={loading}
            style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 10, padding: '12px' }}>
            {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
            Login to DarshanEase
          </button>
        </form>
        <p className="text-center mt-3 small text-muted">
          Don't have an account? <Link to="/register" className="text-warning fw-bold">Register here</Link>
        </p>
      </div>
    </div>
  );
}
