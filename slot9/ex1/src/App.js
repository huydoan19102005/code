import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyFooter from './components/Footer/MyFooter.jsx';
import HomePage from './pages/HomePage.jsx';
import FooterPage from './pages/FooterPage.jsx';
function App() {
  return (
    <>
      <HomePage />
      <FooterPage />
    </>
  );
}

export default App;