import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MainMenu from './MainMenu';
import SalesMenu from './SalesMenu';
import InventoryMenu from './InventoryMenu';
import ItemCart from './ItemCart';
import ItemLookUp from './ItemLookUp';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainMenu />} />
        <Route path="/SalesMenu" element={<SalesMenu />} />
        <Route path="/InventoryMenu" element={<InventoryMenu />} />
        <Route path="/ItemCart" element={<ItemCart />} />
        <Route path="/ItemLookUp" element={<ItemLookUp />} />
      </Route>
    </Routes>
  );
}

export default App;