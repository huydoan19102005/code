import React, { useState } from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { movies } from '../../data/movies';

const Filter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title-asc');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(value, yearFilter, sortBy);
  };

  const handleYearFilterChange = (e) => {
    const value = e.target.value;
    setYearFilter(value);
    applyFilters(searchTerm, value, sortBy);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    applyFilters(searchTerm, yearFilter, value);
  };

  const applyFilters = (search, year, sort) => {
    let filteredMovies = [...movies];

    // Apply search filter
    if (search) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.description.toLowerCase().includes(search.toLowerCase()) ||
        movie.genre.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply year filter
    if (year !== 'all') {
      filteredMovies = filteredMovies.filter(movie => {
        switch (year) {
          case 'before-2000':
            return movie.year <= 2000;
          case '2001-2015':
            return movie.year >= 2001 && movie.year <= 2015;
          case 'after-2015':
            return movie.year > 2015;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filteredMovies.sort((a, b) => {
      switch (sort) {
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'duration-asc':
          return a.duration - b.duration;
        case 'duration-desc':
          return b.duration - a.duration;
        default:
          return 0;
      }
    });

    onFilterChange(filteredMovies);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">Filter & Search Movies</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title, description..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Filter by Year</Form.Label>
              <Form.Select value={yearFilter} onChange={handleYearFilterChange}>
                <option value="all">All Years</option>
                <option value="before-2000">≤ 2000</option>
                <option value="2001-2015">2001 - 2015</option>
                <option value="after-2015">&gt; 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Sort by</Form.Label>
              <Form.Select value={sortBy} onChange={handleSortChange}>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Filter;
