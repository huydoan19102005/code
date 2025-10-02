import React from 'react';
import './Exercise4.css';
import fptLogo from './images.png';

const Exercise4 = () => {
    return (
        <div className="exercise4">
            {/* Top dark bar */}
            <div className="top-bar"></div>

            {/* Header using Bootstrap */}
            <header className="bg-warning ex4-warning-scope pt-4 pb-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <img src={fptLogo} alt="FPT Education" className="img-fluid" style={{ maxHeight: '210px' }} />
                        </div>
                        <div className="col-12 mt-2">
                            <ul className="nav justify-content-center">
                                <li className="nav-item"><a href="#home" className="nav-link text-white py-1">Home</a></li>
                                <li className="nav-item"><a href="#about" className="nav-link text-white py-1">About</a></li>
                                <li className="nav-item"><a href="#contact" className="nav-link text-white py-1">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content using Bootstrap grid */}
            <main className="py-5 bg-white">
                <div className="container">
                    <div className="row g-4">
                        <section id="about" className="col-12">
                            <h2 className="h3 mb-3">About</h2>
                            <p className="mb-0">This is the about section of the website.</p>
                        </section>
                        <section id="contact" className="col-12">
                            <h2 className="h3 mb-3">Contact</h2>
                            <p className="mb-0">For any inquiries, please contact us at example@example.com.</p>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-3" style={{ backgroundColor: '#F2CA81' }}>
                <div className="container text-center text-white">
                    <small>© 2023 Website. All rights reserved.</small>
                </div>
            </footer>
        </div>
    );
};

export default Exercise4;