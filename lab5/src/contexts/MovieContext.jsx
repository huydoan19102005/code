import React, {
  createContext, useContext, useEffect, useMemo, useState, useCallback
} from 'react';
import { MoviesAPI, GenresAPI } from '../api/movies';

const MovieContext = createContext(null);
export const useMovies = () => useContext(MovieContext);

export default function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // bộ lọc / sort
  const [q, setQ] = useState('');
  const [genreId, setGenreId] = useState('');
  const [sort, setSort] = useState('year');
  const [order, setOrder] = useState('desc');

  // form
  const [form, setForm] = useState({ id: null, title: '', year: '', duration: '', genreId: '' });
  const isEditing = !!form.id;

  const fetchGenres = useCallback(async () => {
    setGenres(await GenresAPI.list());
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      // gọi server có title_like
      const serverData = await MoviesAPI.list({
        q,
        genreId: genreId || undefined,
        _sort: sort,
        _order: order
      });

      // Fallback filter ở client (phòng khi JSON Server không lọc do tham số sai/cache)
      let data = serverData;
      if (q && q.trim()) {
        const needle = q.trim().toLowerCase();
        data = serverData.filter(m => String(m.title || '').toLowerCase().includes(needle));
      }
      setMovies(data);
    } catch (e) {
      setError(e?.message || 'Load movies failed');
    } finally {
      setLoading(false);
    }
  }, [q, genreId, sort, order]);

  useEffect(() => { fetchGenres(); }, [fetchGenres]);
  useEffect(() => { fetchMovies(); }, [fetchMovies]); // q/genreId/sort/order đổi là gọi lại

  const saveMovie = useCallback(async (e) => {
    e?.preventDefault?.();
    const payload = {
      title: String(form.title || '').trim(),
      year: Number(form.year),
      duration: Number(form.duration),
      genreId: Number(form.genreId)
    };
    if (!payload.title || !payload.year || !payload.duration || !payload.genreId) {
      alert('Vui lòng nhập đủ trường'); return;
    }
    setLoading(true);
    try {
      if (isEditing) await MoviesAPI.update(form.id, payload);
      else           await MoviesAPI.create(payload);
      setForm({ id: null, title: '', year: '', duration: '', genreId: '' });
      await fetchMovies();
    } finally { setLoading(false); }
  }, [form, isEditing, fetchMovies]);

  const startEdit = useCallback((m) =>
    setForm({ id: m.id, title: m.title, year: m.year, duration: m.duration, genreId: m.genreId }), []);
  const cancelEdit = useCallback(() =>
    setForm({ id: null, title: '', year: '', duration: '', genreId: '' }), []);
  const removeMovie = useCallback(async (id) => {
    if (!window.confirm('Xoá phim này?')) return;
    setLoading(true);
    try { await MoviesAPI.remove(id); await fetchMovies(); }
    finally { setLoading(false); }
  }, [fetchMovies]);

  const value = useMemo(() => ({
    movies, genres, loading, error,
    q, setQ, genreId, setGenreId, sort, setSort, order, setOrder,
    form, setForm, isEditing, saveMovie, startEdit, cancelEdit, removeMovie
  }), [movies, genres, loading, error, q, genreId, sort, order, form, isEditing, saveMovie, startEdit, cancelEdit, removeMovie]);

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
