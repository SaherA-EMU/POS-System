import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MainMenu from './MainMenu';
import SalesMenu from './SalesMenu';
import InventoryMenu from './InventoryMenu';
import ItemCart from './ItemCart';
import ProductPage from './ProductPage';
import ItemLookUp from './ItemLookUp';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/SalesMenu" element={<SalesMenu />} />
        <Route path="/InventoryMenu" element={<InventoryMenu />} />
        <Route path="/ItemCart" element={<ItemCart />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/ItemLookUp" element={<ItemLookUp />} />
      </Routes>
    </BrowserRouter>
    
  );
}

