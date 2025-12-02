// MainMenu.js
import React, { useState } from 'react';
import './Html&Css/style/MainMenu.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import ManagerOverrideModal from './components/ManagerOverrideModal';

function MainMenu() {
  const { currentUser, logout, isManager } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [pendingRoute, setPendingRoute] = useState('');

  const requireManagerAccess = (route) => {
    if (isManager) {
      navigate(route);
    } else {
      setPendingRoute(route);
      setShowManagerModal(true);
    }
  };

  const handleManagerApprove = () => {
    setShowManagerModal(false);
    navigate(pendingRoute);
  };

  return (
    <>
      {showManagerModal && (
        <ManagerOverrideModal
          onApprove={handleManagerApprove}
          onCancel={() => setShowManagerModal(false)}
        />
      )}

      <div className="menu">
        <div className='navDiv'>
          <button className='navbar' onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
          <ul className='navMenu' hidden={!menuOpen}>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/SalesMenu')}>Sales</button>
            <button onClick={() => requireManagerAccess('/EmployeeMenu')}>Employee</button>
            <button onClick={() => requireManagerAccess('/InventoryMenu')}>Inventory</button>
            <div style={{ marginTop: '20px', padding: '10px', borderTop: '1px solid #444' }}>
              <small>Logged in: <strong>{currentUser?.name} ({currentUser?.role})</strong></small>
              <button onClick={logout} style={{
                background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px'
              }}>
                Logout
              </button>
            </div>
          </ul>
        </div>

        <button className="sales" onClick={() => navigate('/SalesMenu')}>
          <img src={require('./Html&Css/images/cashier.png')} alt="Sales" />
          <span>Sales</span>
        </button>

        <button className="employee" onClick={() => requireManagerAccess('/EmployeeMenu')}>
          <img src={require("./Html&Css/images/employee.png")} alt="Employee" />
          <span>Employee {isManager ? '' : '(Manager Only)'}</span>
        </button>

        <button className="inventory" onClick={() => requireManagerAccess('/InventoryMenu')}>
          <img src={require("./Html&Css/images/warehouse.png")} alt="Inventory" />
          <span>Inventory {isManager ? '' : '(Manager Only)'}</span>
        </button>

        <button className="Admin" onClick={() => requireManagerAccess('/Admin')}>
          <img src={require("./Html&Css/images/user.png")} alt="Admin" />
          <span>Admin (Manager Only)</span>
        </button>
      </div>
    </>
  );
}

export default MainMenu;