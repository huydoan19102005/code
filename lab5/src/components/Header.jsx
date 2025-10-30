import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Movie Manager</Link>
        <div className="d-flex align-items-center gap-2">
          {user ? (
            <>
              <span>Signed in as <strong>{user.fullName || user.username}</strong></span>
              <button className="btn btn-outline-secondary btn-sm" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link className="btn btn-primary btn-sm" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
