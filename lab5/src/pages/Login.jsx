import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await login(username, password);
      navigate(from, { replace: true });  // redirect về Movie List
    } catch (err) {
      setError(err?.message || 'Đăng nhập thất bại');
    } finally { setLoading(false); }
  }

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h4 className="mb-3">Login</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit} className="card p-3">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input className="form-control" value={username}
                 onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password}
                 onChange={e => setPassword(e.target.value)} />
        </div>
        <button disabled={loading} className="btn btn-primary" type="submit">Sign in</button>
      </form>
    </div>
  );
}
