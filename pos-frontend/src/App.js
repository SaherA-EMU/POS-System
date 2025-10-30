import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainMenu from './MainMenu';
import SalesMenu from './SalesMenu';

export default function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <MyButton />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/sales" element={<SalesMenu />} />
      </Routes>
    </Router>
    
  );
}

