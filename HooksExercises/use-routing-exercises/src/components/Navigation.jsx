import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Router Demo</h2>
      </div>
      <div className="nav-links">
        {/* NavLink tự động thêm class 'active' nếu đường dẫn khớp */}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Trang Chủ
        </NavLink>
        <NavLink
          to="/san-pham"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Sản Phẩm
        </NavLink>
        <NavLink
          to="/lien-he"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Liên Hệ
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
