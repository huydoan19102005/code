import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent/CounterComponent';
import LightSwitch from './components/LightSwitch/LightSwitch';
import QuestionBank from './components/QuestionBank/QuestionBank';

function App() {
  return (
    <div>
      <CounterComponent />
      <LightSwitch />
      <QuestionBank />
    </div>
  );
}

export default App;