import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTemples } from '../services/api';
import { toast } from 'react-toastify';

export default function Temples() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState('');
  const [search, setSearch] = useState('');

  const emojis = { 'North India': '⛩️', 'South India': '🛕', 'West India': '🌊', 'East India': '🎪' };
  const bgs = ['#FFF3E0', '#FFF8E1', '#F3E5F5', '#E3F2FD', '#F1F8E9', '#FFF9C4'];

  useEffect(() => {
    fetchTemples();
  }, [region]);

  const fetchTemples = async () => {
    setLoading(true);
    try {
      const res = await getTemples({ region, search });
      setTemples(res.data.data);
    } catch {
      toast.error('Failed to load temples');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6E3', paddingTop: 40 }}>
      <div className="container py-4">
        <h2 style={{ fontFamily: 'serif', color: '#7B1414', marginBottom: 4 }}>🛕 Explore Temples</h2>
        <p className="text-muted mb-4">Find and book darshan at India's most revered temples</p>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <input className="form-control" placeholder="🔍 Search temple name..."
              value={search} onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchTemples()} />
          </div>
          <div className="col-md-4">
            <select className="form-select" value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">All Regions</option>
              <option>North India</option>
              <option>South India</option>
              <option>West India</option>
              <option>East India</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn w-100" onClick={fetchTemples}
              style={{ background: '#E8891A', color: 'white', fontWeight: 700 }}>Search</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-warning" /></div>
        ) : temples.length === 0 ? (
          <div className="text-center py-5 text-muted">No temples found</div>
        ) : (
          <div className="row g-4">
            {temples.map((t, i) => (
              <div className="col-md-4 col-sm-6" key={t._id}>
                <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: 16, overflow: 'hidden', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: 160, background: bgs[i % bgs.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                    {emojis[t.region] || '🛕'}
                    <span className="badge position-absolute top-0 end-0 m-2" style={{ background: 'rgba(0,0,0,0.6)', color: '#F5C518' }}>{t.region}</span>
                  </div>
                  <div className="card-body">
                    <h5 style={{ fontFamily: 'serif', color: '#7B1414' }}>{t.name}</h5>
                    <p className="text-muted small mb-2">📍 {t.location}</p>
                    <div className="mb-3">
                      {(t.tags || []).slice(0, 3).map(tag => (
                        <span key={tag} className="badge me-1" style={{ background: '#FFF0DC', color: '#8B4500', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                    <Link to={`/temples/${t._id}`} className="btn w-100 fw-bold"
                      style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 8 }}>
                      View Slots & Book →
                    </Link>
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
