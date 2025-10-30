import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import CarList from "./components/CarList";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand bg-light p-3">
        <Link className="navbar-brand" to="/">Register</Link>
        <Link className="nav-link" to="/cars">Car Management</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/cars" element={<CarList />} />
      </Routes>
    </BrowserRouter>
  );
}
