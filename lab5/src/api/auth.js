import http from './http';

export async function loginApi(username, password) {
  const qs = new URLSearchParams({ username, password });
  const res = await http.get(`/accounts?${qs.toString()}`);
  if (Array.isArray(res.data) && res.data.length) return res.data[0];
  throw new Error('Sai tài khoản hoặc mật khẩu');
}
