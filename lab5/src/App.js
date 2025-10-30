import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';
import MovieManager from './pages/MovieManager.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MovieManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
