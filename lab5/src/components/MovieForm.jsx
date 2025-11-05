import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image, Alert } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';
import { initialMovieState } from '../reducers/movieReducers';

const MovieFields = ({ currentMovie, handleInputChange, handleFileChange, imagePreview, genres, errors = {}, validated = false }) => (
  <>
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group controlId="formAvatar">
          <Form.Label>Ảnh Avatar Phim</Form.Label>
          <Form.Control
            type="file"
            name="avatarFile"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2"
          />
          <Form.Control
            type="text"
            name="avatar"
            value={currentMovie.avatar || ''}
            onChange={handleInputChange}
            placeholder="Hoặc nhập URL hình ảnh"
            isInvalid={validated && errors.avatar}
          />
          <Form.Control.Feedback type="invalid">
            {errors.avatar}
          </Form.Control.Feedback>
          {imagePreview && (
            <div className="mt-2">
              <Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: '200px', maxHeight: '150px' }} />
            </div>
          )}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="formTitle">
          <Form.Label>Tên Phim <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={currentMovie.title || ''}
            onChange={handleInputChange}
            placeholder="Tên phim"
            required
            isInvalid={validated && errors.title}
            isValid={validated && !errors.title && currentMovie.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md={12}>
        <Form.Group controlId="formDescription">
          <Form.Label>Mô tả <span className="text-danger">*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={currentMovie.description || ''}
            onChange={handleInputChange}
            placeholder="Mô tả phim"
            required
            isInvalid={validated && errors.description}
            isValid={validated && !errors.description && currentMovie.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col md={4}>
        <Form.Group controlId="formGenre">
          <Form.Label>Thể loại <span className="text-danger">*</span></Form.Label>
          <Form.Select
            name="genreId"
            value={currentMovie.genreId || ''}
            onChange={handleInputChange}
            required
            isInvalid={validated && errors.genreId}
            isValid={validated && !errors.genreId && currentMovie.genreId}
          >
            <option value="">Chọn thể loại</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.genreId}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group controlId="formDuration">
          <Form.Label>Thời lượng (phút) <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={currentMovie.duration || ''}
            onChange={handleInputChange}
            placeholder="Phút"
            required
            min="1"
            max="600"
            isInvalid={validated && errors.duration}
            isValid={validated && !errors.duration && currentMovie.duration}
          />
          <Form.Control.Feedback type="invalid">
            {errors.duration}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group controlId="formYear">
          <Form.Label>Năm <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={currentMovie.year || ''}
            onChange={handleInputChange}
            placeholder="Năm"
            required
            min="1900"
            max="2030"
            isInvalid={validated && errors.year}
            isValid={validated && !errors.year && currentMovie.year}
          />
          <Form.Control.Feedback type="invalid">
            {errors.year}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col md={2}>
        <Form.Group controlId="formCountry">
          <Form.Label>Quốc gia <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={currentMovie.country || ''}
            onChange={handleInputChange}
            placeholder="Quốc gia"
            required
            isInvalid={validated && errors.country}
            isValid={validated && !errors.country && currentMovie.country}
          />
          <Form.Control.Feedback type="invalid">
            {errors.country}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  </>
);

const MovieForm = () => {
  const state = useMovieState();
  const { dispatch, handleCreateOrUpdate } = useMovieDispatch();
  const { currentMovie, isEditing, showEditModal, genres } = state;
  const { user } = useAuthState();
  const [imagePreview, setImagePreview] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  // Chỉ admin mới thêm được phim
  const isAdmin = user?.role === 'admin';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FIELD', payload: { name, value } });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        dispatch({ type: 'UPDATE_FIELD', payload: { name: 'avatar', value: imageUrl } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseEditModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
    setImagePreview('');
    setValidated(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentMovie.title?.trim()) newErrors.title = 'Tên phim không được để trống';
    else if (currentMovie.title.length < 2) newErrors.title = 'Tên phim phải có ít nhất 2 ký tự';
    if (!currentMovie.description?.trim()) newErrors.description = 'Mô tả không được để trống';
    else if (currentMovie.description.length < 10) newErrors.description = 'Mô tả phải có ít nhất 10 ký tự';
    if (!currentMovie.genreId) newErrors.genreId = 'Vui lòng chọn thể loại';
    if (!currentMovie.duration) newErrors.duration = 'Thời lượng không được để trống';
    else if (currentMovie.duration < 1 || currentMovie.duration > 600) newErrors.duration = 'Thời lượng phải từ 1 đến 600 phút';
    if (!currentMovie.year) newErrors.year = 'Năm không được để trống';
    else if (currentMovie.year < 1900 || currentMovie.year > 2030) newErrors.year = 'Năm phải từ 1900 đến 2030';
    if (!currentMovie.country?.trim()) newErrors.country = 'Quốc gia không được để trống';
    if (!currentMovie.avatar?.trim()) newErrors.avatar = 'Vui lòng chọn ảnh hoặc nhập URL';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    if (!validateForm()) return;
    const dataToSend = {
      ...currentMovie,
      duration: parseInt(currentMovie.duration || 0),
      year: parseInt(currentMovie.year || 0),
      genreId: parseInt(currentMovie.genreId || 1)
    };
    const success = await handleCreateOrUpdate(dataToSend, isEditing !== null, isEditing);
    if (success) {
      if (isEditing === null) {
        setImagePreview('');
        setValidated(false);
        setErrors({});
      } else {
        handleCloseEditModal();
      }
    }
  };

  const isCreating = isEditing === null;
  const createFormProps = {
    currentMovie: isCreating ? currentMovie : initialMovieState.currentMovie,
    handleInputChange: isCreating ? handleInputChange : () => {},
    handleFileChange: isCreating ? handleFileChange : () => {},
    imagePreview: isCreating ? imagePreview : currentMovie.avatar,
    genres: genres,
    errors: isCreating ? errors : {},
    validated: isCreating ? validated : false
  };

  return (
    <>
      {isAdmin ? (
        <Container className="p-3 mb-4 border">
          <h3 className="mb-3">📽️ Thêm Phim Mới</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <MovieFields {...createFormProps} />
            <div className="d-flex gap-2 mt-3">
              <Button variant="success" type="submit">➕ Thêm Phim</Button>
            </div>
          </Form>
        </Container>
      ) : (
        <Container className="p-3 mb-4 border">
          <Alert variant="info">
            <strong>Thông báo:</strong> Chỉ quản trị viên mới có quyền thêm, sửa và xóa phim.
          </Alert>
        </Container>
      )}

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Phim ID: {isEditing}</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <MovieFields
              currentMovie={currentMovie}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              imagePreview={currentMovie.avatar}
              genres={genres}
              errors={errors}
              validated={validated}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>Hủy</Button>
            <Button variant="warning" type="submit">Lưu Thay Đổi</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default MovieForm;

