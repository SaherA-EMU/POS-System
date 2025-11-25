import React from 'react';
import './Html&Css/style/MainMenu.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
   
function MainMenu() {
    const { user, logout, isManager } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);
    
    const navigateToHome = () => 
        navigate('/'); //navigate to Home route
    const navigateToSales = () => 
        navigate('/SalesMenu'); //navigate to SalesMenu route 
    const navigateToInventory = () =>
        navigate('/InventoryMenu'); //navigate to InventoryMenu route
   const navigateToEmployee = () =>
       navigate('/EmployeeMenu'); //navigate to EmployeeMenu route
    
   return (    
    <div className="menu">
            <div className='navDiv'>
                <button className='navbar' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                <ul className='navMenu' hidden={!menuOpen}>
                <button onClick={navigateToHome}>Home</button>
                <button onClick={navigateToSales}>Sales</button>
                {isManager && <button onClick={navigateToEmployee}>Employee</button>}
                {isManager && <button onClick={navigateToInventory}>Inventory</button>}
                
                {/*LOGOUT BUTTON*/}
                <div>
                        <small>Logged in as: <strong>{user?.username || 'User'}</strong></small>
                        <button 
                            onClick={logout}
                            style={{
                                display: 'block',
                                width: '100%',
                                marginTop: '8px',
                                padding: '8px',
                                background: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </ul>
            </div>
            <button className="sales" onClick={navigateToSales}>
                <img src={require('./Html&Css/images/cashier.png')} alt="Sales Icon"/>
                <span>Sales</span>
            </button>

            {isManager ? (
            <>
                <button className="employee" onClick={ () => alert('this feature is not available yet')}>
                    <img src={require("./Html&Css/images/employee.png")} alt="Employee Icon"/>
                    <span>Employee</span>
                 </button>
                <button className="inventory" onClick={navigateToInventory}>
                    <img src={require("./Html&Css/images/warehouse.png")} alt="Warehouse Icon"/>
                    <span>Inventory</span>
                </button>
                <button className="Admin" alt="idk icon" onClick={() => alert('this feature is not available yet')}>
                    <img src={require("./Html&Css/images/user.png")} alt="Admin Icon"/>
                    <span> Admin </span>
                </button>
            </>
            ) : (
                <p style={{ padding: '20px', color: '#888' }}>
                    Logged in as Cashier. Limited access.
                </p>
            )}
        </div> 
    );
}
export default MainMenu;