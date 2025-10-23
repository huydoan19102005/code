import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import QuestionBank from './components/QuestionBank';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div>
      <h1 className="text-center mb-4">useReducer Exercises</h1>
      <h2>Exercise 1</h2>
      <CounterComponent />
      <h2>Exercise 2</h2>
      <LightSwitch />
      <h2>Exercise 3</h2>
      <LoginForm />
      <h2>Exercise 4</h2>
      <RegistrationForm />
      <h2>Exercise 5/6</h2>  
      <QuestionBank />
    </div>
  );
}

export default App;