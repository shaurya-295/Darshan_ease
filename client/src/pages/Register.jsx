import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created! Welcome to DarshanEase 🛕');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const f = (field) => ({ value: form[field], onChange: e => setForm({ ...form, [field]: e.target.value }) });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#1A0A00,#3D1500)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: 460, width: '100%', borderRadius: 20 }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem' }}>🛕</div>
          <h2 style={{ fontFamily: 'serif', color: '#7B1414' }}>Join DarshanEase</h2>
          <p className="text-muted small">Create your free account today</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-12">
              <label className="form-label fw-bold small text-muted">FULL NAME</label>
              <input className="form-control" placeholder="Ramesh Sharma" required {...f('name')} />
            </div>
            <div className="col-12">
              <label className="form-label fw-bold small text-muted">EMAIL ADDRESS</label>
              <input type="email" className="form-control" placeholder="your@email.com" required {...f('email')} />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted">PHONE</label>
              <input className="form-control" placeholder="+91 XXXXX XXXXX" {...f('phone')} />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted">PASSWORD</label>
              <input type="password" className="form-control" placeholder="Min. 6 characters" required {...f('password')} />
            </div>
          </div>
          <button className="btn w-100 fw-bold" type="submit" disabled={loading}
            style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 10, padding: '12px' }}>
            {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
            Create Free Account
          </button>
        </form>
        <p className="text-center mt-3 small text-muted">
          Already have an account? <Link to="/login" className="text-warning fw-bold">Login here</Link>
        </p>
      </div>
    </div>
  );
}
