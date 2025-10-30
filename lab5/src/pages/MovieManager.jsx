import React from 'react';
import MovieProvider from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';

export default function MovieManager() {
  return (
    <MovieProvider>
      <div className="container">
        <h4 className="mb-3">Movie Manager</h4>
        <MovieForm />
        <MovieTable />
      </div>
    </MovieProvider>
  );
}
