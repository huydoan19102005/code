import React, { useReducer } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const initialState = {
  usernameOrEmail: "",
  password: "",
  remember: false,
  submitting: false,
  localError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "FIELD":
      return { ...state, [action.field]: action.value, localError: "" };
    case "SUBMIT":
      return { ...state, submitting: true, localError: "" };
    case "DONE":
      return { ...state, submitting: false };
    case "LOCAL_ERROR":
      return { ...state, submitting: false, localError: action.message };
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { usernameOrEmail, password, remember, submitting, localError } = state;
  const auth = useAuth();

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    dispatch({ type: "FIELD", field: name, value: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    if (!usernameOrEmail.trim() || !password.trim())
      return "Vui lòng nhập đầy đủ tài khoản/mật khẩu.";
    if (password.length < 6) return "Mật khẩu tối thiểu 6 ký tự.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return dispatch({ type: "LOCAL_ERROR", message: msg });

    dispatch({ type: "SUBMIT" });
    await auth.login({ usernameOrEmail, password });
    dispatch({ type: "DONE" });
    if (!auth.error && auth.user) {
      alert(`Đăng nhập thành công (admin)\nUser: ${auth.user.username}\nRemember: ${remember}`);
    }
  };

  return (
    <Card className="p-4 my-3">
      <h4>Admin Login (useContext + useReducer)</h4>

      {(localError || auth.error) && (
        <Alert variant="danger" className="mb-3">
          {localError || auth.error}
        </Alert>
      )}

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username hoặc Email</Form.Label>
          <Form.Control
            name="usernameOrEmail"
            value={usernameOrEmail}
            onChange={onChange}
            placeholder="admin hoặc admin@example.com"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            placeholder="123456"
          />
        </Form.Group>

        <Form.Check
          className="mb-3"
          name="remember"
          label="Ghi nhớ đăng nhập"
          checked={remember}
          onChange={onChange}
        />

        <Button type="submit" disabled={submitting || auth.loading}>
          {submitting || auth.loading ? "Đang xử lý..." : "Đăng nhập"}
        </Button>

        {auth.user && (
          <Button className="ms-2" variant="secondary" onClick={auth.logout}>
            Đăng xuất
          </Button>
        )}
      </Form>
    </Card>
  );
}
