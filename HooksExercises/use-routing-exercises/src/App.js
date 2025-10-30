import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import các component cần thiết
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Navigation from './components/Navigation.jsx'; 

function App() {
  return (
    <>
      <Navigation /> {/* Hiển thị thanh điều hướng ở mọi nơi */}
      <div className="container">
        <Routes>
          {/* Route Cơ bản theo yêu cầu bài tập */}
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
