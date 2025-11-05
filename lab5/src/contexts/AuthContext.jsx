import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import movieApi from '../api/movieAPI';

const AuthStateContext = createContext({ user: null, loading: false });
const AuthDispatchContext = createContext({ login: async () => {}, logout: () => {} });

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { setUser(null); }
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await movieApi.get('/accounts', { params: { username, password } });
      const found = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null;
      if (!found) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng');
      }
      const authUser = { id: found.id, username: found.username, name: found.name, role: found.role };
      setUser(authUser);
      localStorage.setItem('auth_user', JSON.stringify(authUser));
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message || 'Đăng nhập thất bại' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const stateValue = useMemo(() => ({ user, loading }), [user, loading]);
  const dispatchValue = useMemo(() => ({ login, logout }), []);

  return (
    <AuthStateContext.Provider value={stateValue}>
      <AuthDispatchContext.Provider value={dispatchValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;

