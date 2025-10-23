import React, { createContext, useContext, useReducer, useMemo } from "react";

const mockAccounts = [
  { id: 1, username: "admin", email: "admin@example.com", password: "123456", role: "admin", status: "active" },
  { id: 2, username: "user1", email: "user1@example.com", password: "123456", role: "user",  status: "active" },
  { id: 3, username: "user2", email: "user2@example.com", password: "123456", role: "user",  status: "locked" },
];

const AuthContext = createContext(null);

const initialState = { user: null, error: "", loading: false };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: "" };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.user, error: "" };
    case "LOGIN_ERROR":
      return { ...state, loading: false, user: null, error: action.message };
    case "LOGOUT":
      return { ...state, user: null, error: "" };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: "LOGIN_START" });

    // “Giả lập” gọi API bằng dữ liệu cứng
    const acc = mockAccounts.find(a =>
      (a.username === usernameOrEmail || a.email === usernameOrEmail) &&
      a.password === password
    );

    if (!acc) {
      return dispatch({ type: "LOGIN_ERROR", message: "Sai tài khoản hoặc mật khẩu." });
    }
    if (acc.role !== "admin") {
      return dispatch({ type: "LOGIN_ERROR", message: "Chỉ admin được phép đăng nhập." });
    }
    if (acc.status !== "active") {
      return dispatch({ type: "LOGIN_ERROR", message: "Tài khoản chưa hoạt động/đã khóa." });
    }
    // Thành công
    return dispatch({ type: "LOGIN_SUCCESS", user: { id: acc.id, username: acc.username, email: acc.email, role: acc.role } });
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  const value = useMemo(() => ({ ...state, login, logout }), [state]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
