import React from "react";
import { useAuth } from './Context/AuthContext';
import './Html&Css/style/MainMenu.css';
import { useNavigate } from "react-router-dom";


export default function InventoryMenu() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
        const [menuOpen, setMenuOpen] = React.useState(false);
        
        const navigateToHome = () => 
            navigate('/'); //navigate to Home route
        const navigateToSales = () => 
            navigate('/SalesMenu'); //navigate to SalesMenu route 
        const navigateToInventory = () =>
            navigate('/InventoryMenu'); //navigate to InventoryMenu route
        const navigateToEmployee = () =>
           navigate('/EmployeeMenu'); //navigate to EmployeeMenu route
        const navigateToItemLookup = () =>
            navigate('/ItemLookUp'); //navigate to ItemLookUp route
        const navigateToAddItem = () =>
            navigate('/AddItem'); //navigate to AddItem route
    return (
        <div className="menu">
            <div className='navDiv'>
                <button className='navbar' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                <ul className='navMenu' hidden={!menuOpen}>
                    <button onClick={navigateToHome}>Home</button>
                    <button onClick={navigateToSales}>Sales</button>
                    <button onClick={navigateToEmployee}>Employee</button>
                    <button onClick={navigateToInventory}>Inventory</button>
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
            <button className="ItemLookUp" onClick={navigateToItemLookup}>
                <img src={require('./Html&Css/images/loupe.png')} alt="Item Look Up Icon" />
                <span> Item Look Up</span>
            </button>
            <button className="AddItem" onClick={navigateToAddItem}>
                <img src={require('./Html&Css/images/add.png')} alt="Add Item Icon"/>
                <span> Add Item</span>
            </button>
            <button className="LostItem" onClick={() => alert('this feature is not available yet')}>
                <img src={require('./Html&Css/images/lost-items.png')} alt="LostItem" />
                <span> Lost Item</span>
            </button>
        </div>
    );
}