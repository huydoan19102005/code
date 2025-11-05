import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import FilterBar from '../components/FilterBar';

const MovieManagerContent = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>
      <FilterBar />
      <MovieForm />
      <h2 className="mt-4">Danh sách Phim</h2>
      <MovieTable />
    </Container>
  );
};

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;

