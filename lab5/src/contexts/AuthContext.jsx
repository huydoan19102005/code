import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginApi } from '../api/auth';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
const KEY = 'auth_user';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  async function login(username, password) {
    const u = await loginApi(username, password);
    setUser(u);
    localStorage.setItem(KEY, JSON.stringify(u));
    return u;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(KEY);
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
