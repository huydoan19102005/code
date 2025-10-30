import React from 'react';
import { useMovies } from '../contexts/MovieContext';

export default function MovieForm() {
  const { form, setForm, isEditing, saveMovie, cancelEdit, genres, loading } = useMovies();

  return (
    <form onSubmit={saveMovie} className="card p-3 mb-3">
      <h5 className="mb-3">{isEditing ? 'Edit movie' : 'Add new movie'}</h5>

      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Title</label>
          <input className="form-control" value={form.title}
                 onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Year</label>
          <input type="number" className="form-control" value={form.year}
                 onChange={e => setForm({ ...form, year: e.target.value })} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Duration (min)</label>
          <input type="number" className="form-control" value={form.duration}
                 onChange={e => setForm({ ...form, duration: e.target.value })} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Genre</label>
          <select className="form-select" value={form.genreId}
                  onChange={e => setForm({ ...form, genreId: e.target.value })}>
            <option value="">-- select --</option>
            {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button disabled={loading} className="btn btn-primary" type="submit">
          {isEditing ? 'Save changes' : 'Create'}
        </button>
        {isEditing && (
          <button className="btn btn-secondary" type="button" onClick={cancelEdit}>Cancel</button>
        )}
      </div>
    </form>
  );
}
