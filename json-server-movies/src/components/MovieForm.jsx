import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { initialMovieState } from '../reducers/movieReducers';

const MovieFields = ({ movie, handleInputChange }) => (
    <>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="title" 
                        value={movie.title || ''} 
                        onChange={handleInputChange} 
                        required 
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="formGenre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select 
                        name="genreId" 
                        value={movie.genreId || ''} 
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select genre</option>
                        <option value="1">Sci-Fi</option>
                        <option value="2">Comedy</option>
                        <option value="3">Drama</option>
                        <option value="4">Horror</option>
                        <option value="5">Romance</option>
                        <option value="6">Action</option>
                        <option value="7">Thriller</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="year" 
                        value={movie.year || ''} 
                        onChange={handleInputChange} 
                        required 
                    />
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group controlId="formDuration">
                    <Form.Label>Duration (minutes)</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="duration" 
                        value={movie.duration || ''} 
                        onChange={handleInputChange} 
                        required 
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={12}>
                <Form.Group controlId="formPoster">
                    <Form.Label>Poster URL</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="poster" 
                        value={movie.poster || ''} 
                        onChange={handleInputChange} 
                        required 
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col md={12}>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="description" 
                        value={movie.description || ''} 
                        onChange={handleInputChange} 
                        required 
                    />
                </Form.Group>
            </Col>
        </Row>
    </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal } = state;

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let processedValue = value;
    
    // Convert string to number for number inputs
    if (type === 'number') {
      processedValue = value ? parseInt(value, 10) : '';
    }

    // For select, ensure empty string is converted to empty string
    if (type === 'select-one' && value === '') {
      processedValue = '';
    }

    dispatch({ 
      type: 'UPDATE_FIELD', 
      payload: { name, value: processedValue }
    });
  };

  const handleCloseEditModal = () => {
      dispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleCreateOrUpdate(currentMovie, isEditing !== null, isEditing);
    if (success) {
      e.target.reset();
    }
  };

  return (
    <>
      {/* ADD NEW MOVIE FORM */}
      <Container className="p-3 mb-4 border">
        <h3 className="mb-3">🎬 Add New Movie</h3>
        <Form onSubmit={handleSubmit}>
            <MovieFields 
                movie={currentMovie}
                handleInputChange={handleInputChange}
            />
            <div className="d-flex gap-2 mt-3">
                <Button variant="success" type="submit">
                    Add Movie
                </Button>
            </div>
        </Form>
      </Container>
      
      {/* EDIT MODAL */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Edit Movie ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <MovieFields movie={currentMovie} handleInputChange={handleInputChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>Cancel</Button>
                <Button variant="warning" type="submit">Save Changes</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;