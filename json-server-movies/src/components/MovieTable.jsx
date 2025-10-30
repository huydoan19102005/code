import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch(); 
  
  const { movies, loading, movieToDelete, showDeleteModal } = state;

  // Mapping genreId to genre name
  const genreMap = {
    1: 'Sci-Fi',
    2: 'Comedy', 
    3: 'Drama',
    4: 'Horror',
    5: 'Romance',
    6: 'Action',
    7: 'Thriller'
  };

  const handleEditClick = (movie) => {
      dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
      dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
          <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" className="me-2" />
              <Alert variant="info" className="mt-3">Loading movies...</Alert>
          </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Poster</th>
              <th>ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Duration (min)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td><Image src={movie.poster} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td>{genreName}</td>
                  <td>{movie.duration} min</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{movieToDelete?.title}" (ID: {movieToDelete?.id})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;