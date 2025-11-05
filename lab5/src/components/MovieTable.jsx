import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();
  const { movies, genres, loading, movieToDelete, showDeleteModal, showViewModal, movieToView } = state;

  const { user } = useAuthState();

  const isAdmin = user?.role === 'admin';

  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  const handleViewClick = (movie) => {
    dispatch({ type: 'OPEN_VIEW_MODAL', payload: movie });
  }

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng (phút)</th>
              {isAdmin && <th>Thao tác</th>}
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td><Image src={movie.avatar} alt={movie.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} rounded /></td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td>{genreName}</td>
                  <td>{movie.duration} phút</td>
                  {isAdmin && (
                    <td>
                      <Button variant="primary" size="sm" onClick={() => handleEditClick(movie)} className="me-2">Sửa</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)} className="me-2">Xóa</Button>

                      <Button variant="light" size="sm" onClick={() => handleViewClick(movie)} className="me-2">Xem</Button>


                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim "{movieToDelete?.title}" (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={() => dispatch({ type: 'CLOSE_VIEW_MODAL' })} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết phim: {movieToView?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieToView && (
            <div className="d-flex gap-3">
              <Image src={movieToView.avatar} alt={movieToView.title} thumbnail style={{ maxWidth: 220 }} />
              <div>
                <p><strong>ID:</strong> {movieToView.id}</p>
                <p><strong>Thể loại:</strong> {genreMap[movieToView.genreId] || 'Unknown'}</p>
                <p><strong>Thời lượng:</strong> {movieToView.duration} phút</p>
                <p><strong>Năm:</strong> {movieToView.year}</p>
                <p><strong>Quốc gia:</strong> {movieToView.country}</p>
                <p className="mb-0"><strong>Mô tả:</strong> {movieToView.description}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_VIEW_MODAL' })}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;

