import http from './http';

export const MoviesAPI = {
  async list(params = {}) {
    const { q, genreId, _sort = 'year', _order = 'desc' } = params;
    const qs = new URLSearchParams();
    if (q && q.trim()) qs.append('title_like', q.trim()); // server-side search
    if (genreId) qs.append('genreId', genreId);
    qs.append('_sort', _sort);
    qs.append('_order', _order);
    qs.append('_expand', 'genre'); // lấy kèm tên genre

    const url = `/movies?${qs.toString()}`;
    // bật log để bạn tự kiểm tra trong DevTools Network
    console.log('[GET]', url);
    const res = await http.get(url);
    return res.data; // mảng movies (có field genre khi _expand)
  },

  get:    (id) => http.get(`/movies/${id}?_expand=genre`).then(r => r.data),
  create: (payload) => http.post('/movies', payload).then(r => r.data),
  update: (id, payload) => http.put(`/movies/${id}`, payload).then(r => r.data),
  remove: (id) => http.delete(`/movies/${id}`)
};

export const GenresAPI = {
  list: () => http.get('/genres').then(r => r.data)
};
