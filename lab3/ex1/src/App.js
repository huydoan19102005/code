import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyFooter from './components/Footer/MyFooter.jsx';
import HomePage from './pages/HomePage.jsx';
import FooterPage from './pages/FooterPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <FooterPage />
          </>
        } />
        <Route path="/account" element={
          <>
            <AccountPage />
            <FooterPage />
          </>
        } />
        <Route path="/about" element={
          <>
            <AboutPage />
            <FooterPage />
          </>
        } />
        <Route path="/contact" element={
          <>
            <ContactPage />
            <FooterPage />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
