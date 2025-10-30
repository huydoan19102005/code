import React from 'react';
import { useMovies } from '../contexts/MovieContext';

export default function MovieTable() {
  const {
    movies, loading, error,
    q, setQ, genreId, setGenreId, sort, setSort, order, setOrder,
    genres, startEdit, removeMovie
  } = useMovies();

  return (
    <div className="card p-3">
      <div className="d-flex flex-wrap gap-2 align-items-end mb-3">
        <div>
          <label className="form-label">Search</label>
          <input
            className="form-control"
            placeholder="title contains..."
            value={q}
            onChange={e => setQ(e.target.value)}  // ← cập nhật q
          />
        </div>
        <div>
          <label className="form-label">Genre</label>
          <select className="form-select" value={genreId} onChange={e => setGenreId(e.target.value)}>
            <option value="">All</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">Sort by</label>
          <select className="form-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="year">Year</option>
            <option value="title">Title</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        <div>
          <label className="form-label">Order</label>
          <select className="form-select" value={order} onChange={e => setOrder(e.target.value)}>
            <option value="desc">desc</option>
            <option value="asc">asc</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th style={{width:60}}>ID</th>
              <th>Title</th>
              <th>Year</th>
              <th>Duration</th>
              <th>Genre</th>
              <th style={{width:160}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6}>Loading...</td></tr>
            ) : movies.length ? movies.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.title}</td>
                <td>{m.year}</td>
                <td>{m.duration} min</td>
                <td>{m?.genre?.name ?? '-'}</td> {/* ← cần _expand=genre */}
                <td className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(m)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeMovie(m.id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6}>No data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
