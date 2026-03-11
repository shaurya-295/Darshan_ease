import React from 'react';
import { Link } from 'react-router-dom';

const temples = [
  { name: 'Tirupati Balaji', loc: 'Andhra Pradesh', emoji: '⛩️', bg: '#FFF3E0' },
  { name: 'Kashi Vishwanath', loc: 'Varanasi, UP', emoji: '🕌', bg: '#FFF8E1' },
  { name: 'Vaishno Devi', loc: 'Jammu & Kashmir', emoji: '🏔️', bg: '#F3E5F5' },
  { name: 'Somnath', loc: 'Gujarat', emoji: '🌊', bg: '#E3F2FD' },
  { name: 'Shirdi Sai Baba', loc: 'Maharashtra', emoji: '🙏', bg: '#F1F8E9' },
  { name: 'Jagannath Puri', loc: 'Odisha', emoji: '🎪', bg: '#FFF9C4' },
];

export default function Home() {
  return (
    <div style={{ background: '#FDF6E3', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg,#1A0A00,#3D1500,#6B2A00)', padding: '100px 5vw 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle, #F5C518 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}>
          <span style={{ background: 'rgba(232,137,26,0.18)', border: '1px solid rgba(232,137,26,0.4)', color: '#F5C518', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', padding: '6px 18px', borderRadius: 50, textTransform: 'uppercase' }}>
            ✦ Online Darshan Booking
          </span>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem,7vw,4.5rem)', color: 'white', marginTop: 20, lineHeight: 1.1 }}>
            Book Your <span style={{ color: '#F5C518' }}>Sacred</span><br />Darshan Online
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', fontStyle: 'italic', margin: '10px 0 16px', letterSpacing: '0.08em' }}>दर्शन की सुविधा, आपके घर से</p>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 36px' }}>
            Skip the queues. Choose your time. Experience divine blessings — book darshan slots at India's most revered temples in seconds.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/temples" className="btn btn-lg fw-bold px-4" style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 50 }}>
              🛕 Explore Temples
            </Link>
            <Link to="/register" className="btn btn-lg fw-bold px-4" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent', borderRadius: 50 }}>
              Create Free Account
            </Link>
          </div>
          <div className="d-flex justify-content-center gap-5 mt-4 flex-wrap">
            {[['500+','Temples'],['2M+','Devotees'],['50+','Cities'],['4.9★','Rating']].map(([n,l]) => (
              <div key={l} className="text-center">
                <div style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#F5C518' }}>{n}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: '#E8891A', textTransform: 'uppercase', marginBottom: 8 }}>Simple Process</div>
          <h2 style={{ fontFamily: 'Georgia,serif', color: '#2C1A0E' }}>Book Darshan in 4 Easy Steps</h2>
        </div>
        <div className="row g-4 text-center">
          {[
            { n:1, icon:'🔍', title:'Find Your Temple', desc:'Browse 500+ temples across India. Filter by location or deity.' },
            { n:2, icon:'📅', title:'Pick a Slot', desc:'View real-time available slots and choose your preferred time.' },
            { n:3, icon:'✍️', title:'Fill Details', desc:'Enter devotee info, tickets count, and pooja type.' },
            { n:4, icon:'🎟️', title:'Confirm & Go', desc:'Get instant confirmation. Show e-ticket at temple entrance.' },
          ].map(s => (
            <div className="col-md-3 col-sm-6" key={s.n}>
              <div className="card border-0 h-100 p-4" style={{ borderRadius: 20, background: '#FFFDF7', boxShadow: '0 4px 20px rgba(120,60,0,0.08)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', width: 32, height: 32, background: '#E8891A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.85rem', boxShadow: '0 4px 12px rgba(232,137,26,0.4)' }}>{s.n}</div>
                <div style={{ fontSize: '2.4rem', marginBottom: 12, marginTop: 12 }}>{s.icon}</div>
                <h5 style={{ fontFamily: 'Georgia,serif', color: '#2C1A0E' }}>{s.title}</h5>
                <p className="text-muted small">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Temples */}
      <div style={{ background: 'white', padding: '60px 5vw' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: '#E8891A', textTransform: 'uppercase' }}>Explore</div>
              <h2 style={{ fontFamily: 'Georgia,serif', color: '#2C1A0E' }}>Popular Temples</h2>
            </div>
            <Link to="/temples" className="btn fw-bold" style={{ border: '2px solid #E8891A', color: '#E8891A', borderRadius: 50 }}>View All →</Link>
          </div>
          <div className="row g-4">
            {temples.map((t, i) => (
              <div className="col-md-4 col-sm-6" key={i}>
                <div className="card border-0 h-100 shadow-sm" style={{ borderRadius: 16, overflow: 'hidden', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: 160, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>{t.emoji}</div>
                  <div className="card-body">
                    <h6 style={{ fontFamily: 'Georgia,serif', color: '#7B1414' }}>{t.name}</h6>
                    <p className="text-muted small">📍 {t.loc}</p>
                    <Link to="/temples" className="btn btn-sm w-100 fw-bold" style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 8 }}>
                      Book Darshan →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg,#1A0A00,#3D1500)', padding: '80px 5vw', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Georgia,serif', color: 'white', marginBottom: 14 }}>
          Begin Your <span style={{ color: '#F5C518' }}>Sacred</span> Journey Today
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 30 }}>Join over 2 million devotees who plan their darshan with ease and peace of mind.</p>
        <Link to="/register" className="btn btn-lg fw-bold px-5" style={{ background: 'linear-gradient(135deg,#E8891A,#B85C00)', color: 'white', borderRadius: 50 }}>
          🙏 Get Started Free
        </Link>
      </div>
    </div>
  );
}
