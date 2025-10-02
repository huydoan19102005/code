import React, { useState } from 'react';
import Logo from './Logo.png';
import './Exercise5.css';
import sinhvien from './sinhvien.png'
import hieu from './hieu.png'
import thong from './thong.png'
import bao1 from './bao1.png'
import bao2 from './bao2.png'
import huy from './huy.png'

export default function Exercise5() {
    const [attendance, setAttendance] = useState({});

    const students = [
        { id: 'DE190198', name: 'Huỳnh Bá Hiếu', campus: 'DaNang', img: hieu },
        { id: 'DE190194', name: 'Phùng Gia Bảo', campus: 'DaNang', img: bao1 },
        { id: 'DE190474', name: 'Đoàn Quang Huy', campus: 'DaNang', img: huy },
        { id: 'DE190207', name: 'Nguyễn Lê Gia Bảo', campus: 'DaNang', img: bao2 },
    ];

    const handleChange = (sid, value) => {
        setAttendance(prev => ({ ...prev, [sid]: value }));
    };

    const handleSubmit = (sid) => {
        const value = attendance[sid] ?? 'Absent';
        // For demo, just alert. In real app, send to API here.
        // eslint-disable-next-line no-alert
        alert(`${sid}: ${value}`);
    };

    const orange = '#e58f2a';
    const lightOrange = '#efc07a';

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* Top bar */}
            <div className="exercise5" style={{ backgroundColor: '#EACDAD', color: '#fff' }}>
                <div className="container py-2 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                        <img src={Logo} alt="FPT" style={{ height: 50 }} />
                        <a href="#" className="text-orange text-decoration-none"><i className="bi bi-house-door-fill me-1"></i>Trang chủ</a>
                        <a href="#" className="text-orange text-decoration-none"><i className="bi bi-bookmarks-fill me-1"></i>Ngành học</a>
                        <a href="#" className="text-orange text-decoration-none"><i className="bi bi-mortarboard-fill me-1"></i>Tuyển sinh</a>
                        <a href="#" className="text-orange text-decoration-none"><i className="bi bi-card-list me-1"></i>Sinh viên</a>
                    </div>
                    <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input className="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search" style={{ width: 200 }} />
                    </form>
                </div>
            </div>

            {/* Banner */}
            <div style={{ backgroundColor: orange }}>
                <div className="container py-3">
                    <img
                        src={sinhvien}
                        alt="Banner"
                        className="img-fluid w-100"
                        style={{ maxHeight: 720, objectFit: 'cover' }}
                    />
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="container my-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb small">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Students</li>
                    </ol>
                </nav>
            </div>

            {/* Title */}
            <div className="container">
                <h4 className="text-center mb-4">Students Detail</h4>
            </div>

            {/* Grid of students */}
            <div className="container students-section">
                <div className="row g-4">
                    {students.map((s) => (
                        <div className="col-12 col-md-6" key={s.id}>
                            <div className="student-card h-100 shadow-sm bg-white">
                                <img src={s.img} className="student-img w-100" alt={s.name} />
                                <div className="student-body">
                                    <div className="d-flex justify-content-center student-meta">
                                        <span>{s.id}</span>
                                    </div>
                                    <div className="student-row">
                                        <span>{s.name}</span>
                                        <span className="text-muted">{s.campus}</span>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3 mt-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`att-${s.id}`}
                                                id={`absent-${s.id}`}
                                                checked={(attendance[s.id] ?? 'Absent') === 'Absent'}
                                                onChange={() => handleChange(s.id, 'Absent')}
                                            />
                                            <label className="form-check-label" htmlFor={`absent-${s.id}`}>Absent</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`att-${s.id}`}
                                                id={`present-${s.id}`}
                                                checked={attendance[s.id] === 'Present'}
                                                onChange={() => handleChange(s.id, 'Present')}
                                            />
                                            <label className="form-check-label" htmlFor={`present-${s.id}`}>Present</label>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <button type="button" className="btn-orange" onClick={() => handleSubmit(s.id)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-bar py-4 mt-auto">
                <div className="container">
                    <div className="row g-3 align-items-center">
                        <div className="col-12 col-md-4 small">
                            <div className="fw-semibold mb-1">Our Address</div>
                            <div>Khu đô thị FPT Đà Nẵng</div>
                            <div>+84236371111</div>
                            <div>admissions@fpt.edu.vn</div>
                        </div>
                        <div className="col-12 col-md-4 text-center small">© Copyright 2023</div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex justify-content-md-end justify-content-center gap-3 small">
                                <span>G+</span>
                                <span>f</span>
                                <span>in</span>
                                <span>♥</span>
                                <span>✉</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

