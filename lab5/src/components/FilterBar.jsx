import React, { useMemo, useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useMovieDispatch, useMovieState } from '../contexts/MovieContext';

const FilterBar = () => {
  const { genres, filters } = useMovieState();
  const { dispatch, fetchMovies } = useMovieDispatch();

  const [localFilters, setLocalFilters] = useState({
    q: filters.q || '',
    genreId: filters.genreId || '',
    durationMin: filters.durationMin || '',
    durationMax: filters.durationMax || '',
    sort: filters.sort || ''
  });

  useEffect(() => {
    setLocalFilters({
      q: filters.q || '',
      genreId: filters.genreId || '',
      durationMin: filters.durationMin || '',
      durationMax: filters.durationMax || '',
      sort: filters.sort || ''
    });
  }, [filters]);

  const genreOptions = useMemo(() => [{ id: '', name: 'Tất cả' }, ...genres], [genres]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: localFilters });
    fetchMovies();
  };

  const clearFilters = () => {
    const cleared = { q: '', genreId: '', durationMin: '', durationMax: '', sort: '' };
    setLocalFilters(cleared);
    dispatch({ type: 'SET_FILTERS', payload: cleared });
    fetchMovies();
  };

  return (
    <div className="p-3 mb-3 border rounded">
      <Row className="g-2 align-items-end">
        <Col md={3}>
          <Form.Group controlId="q">
            <Form.Label>Tìm kiếm</Form.Label>
            <Form.Control type="text" placeholder="Từ khóa..." name="q" value={localFilters.q} onChange={updateField} />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="genreId">
            <Form.Label>Thể loại</Form.Label>
            <Form.Select name="genreId" value={localFilters.genreId} onChange={updateField}>
              {genreOptions.map(g => (
                <option key={g.id || 'all'} value={g.id}>{g.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="durationMin">
            <Form.Label>Thời lượng từ</Form.Label>
            <Form.Control type="number" name="durationMin" value={localFilters.durationMin} onChange={updateField} />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="durationMax">
            <Form.Label>Đến</Form.Label>
            <Form.Control type="number" name="durationMax" value={localFilters.durationMax} onChange={updateField} />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="sort">
            <Form.Label>Sắp xếp</Form.Label>
            <Form.Select name="sort" value={localFilters.sort} onChange={updateField}>
              <option value="">Mặc định</option>
              <option value="asc">Tên A → Z</option>
              <option value="desc">Tên Z → A</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3 d-flex gap-2">
        <Button variant="primary" onClick={applyFilters}>Áp dụng</Button>
        <Button variant="outline-secondary" onClick={clearFilters}>Xóa lọc</Button>
      </div>
    </div>
  );
};

export default FilterBar;

