import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';

const MovieManagerContent = () => {
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">🎬 Movie Management</h1>
            <MovieForm />
            <h2 className="mt-4">Movie List</h2>
            <MovieTable />
        </Container>
    );
}

const MovieManager = () => (
    <MovieProvider>
        <MovieManagerContent />
    </MovieProvider>
);

export default MovieManager;