import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { usePayment } from '../hooks/usePayment';

const FilterBar = () => {
    const { filters, sortBy, setFilter, setSort, getUniqueSemesters, getUniqueCourses } = usePayment();
    
    const handleSearchChange = (e) => {
        setFilter('search', e.target.value);
    };

    const handleSemesterChange = (e) => {
        setFilter('semester', e.target.value);
    };

    const handleCourseChange = (e) => {
        setFilter('course', e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleClearFilters = () => {
        setFilter('search', '');
        setFilter('semester', '');
        setFilter('course', '');
        setSort('course_asc');
    };
    
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by semester or course name  */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by semester or course name"
                                    value={filters.search}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Semester  */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Semester</Form.Label>
                                <Form.Select value={filters.semester} onChange={handleSemesterChange}>
                                    <option value="">All Semesters</option>
                                    {getUniqueSemesters().map(semester => (
                                        <option key={semester} value={semester}>{semester}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Filter by Course name */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Course</Form.Label>
                                <Form.Select value={filters.course} onChange={handleCourseChange}>
                                    <option value="">All Courses</option>
                                    {getUniqueCourses().map(course => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        <Col xs={12} md={4} lg={3}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select value={sortBy} onChange={handleSortChange}>
                                    <option value="course_asc">Course name ascending</option>
                                    <option value="course_desc">Course name descending</option>
                                    <option value="date_asc">Date ascending</option>
                                    <option value="date_desc">Date descending</option>
                                    <option value="amount_asc">Amount ascending</option>
                                    <option value="amount_desc">Amount descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Clear Filters Button */}
                        <Col xs={12} md={4} lg={1}>
                            <Form.Group>
                                <Form.Label>&nbsp;</Form.Label>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={handleClearFilters}
                                    className="w-100"
                                >
                                    Clear
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterBar;
