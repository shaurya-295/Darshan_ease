import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'rgba(26,10,0,0.95)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(232,137,26,0.2)' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: '#F5C518', fontFamily: 'serif', fontSize: '1.4rem' }}>
          🛕 DarshanEase
        </Link>
        <button className="navbar-toggler" onClick={() => setOpen(!open)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            <li className="nav-item"><Link className="nav-link" to="/temples">Temples</Link></li>
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/my-bookings">My Bookings</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/donations">Donations</Link></li>
                {user.role === 'ADMIN' && (
                  <li className="nav-item"><Link className="nav-link text-warning" to="/admin">Admin</Link></li>
                )}
                <li className="nav-item">
                  <span className="nav-link text-warning">🙏 {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-warning btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item">
                  <Link className="btn btn-warning btn-sm fw-bold px-3" to="/register">Book Now</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
