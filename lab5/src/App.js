import './App.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MovieManager from './pages/MovieManager';
import Login from './pages/Login';
import { useAuthState } from './contexts/AuthContext';

const App = () => {
  const { user } = useAuthState();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={user ? <MovieManager /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to={user ? '/movies' : '/login'} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;