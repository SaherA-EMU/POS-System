import React from 'react';
import './Html&Css/style/MainMenu.css';
import { useNavigate } from "react-router-dom";

export default function ItemLookUp() {
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
        <div>
            <div className='navDiv'>
                <button className='navbar' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                <ul className='navMenu' hidden={!menuOpen}>
                <button onClick={navigateToHome}>Home</button>
                <button onClick={navigateToSales}>Sales</button>
                <button onClick={navigateToEmployee}>Employee</button>
                <button onClick={navigateToInventory}>Inventory</button>
                </ul>
            </div>
            <div style={{ padding: '20px', paddingTop: '120px' }}>
                <h2>Inventory Lookup</h2>
                <div style={{
                    border: '2px solid goldenrod',
                    borderRadius: '8px',
                    padding: '20px',
                    maxHeight: '500px',
                    minHeight: '200px',
                    overflowY: 'auto',
                    backgroundColor: 'White',
                    color: '#1f1f1f'
                }}>
                    <p style={{ textAlign: 'center', color: '#666' }}>No items to display</p>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={navigateToInventory}>Back to Inventory</button>
                    <button onClick={navigateToHome}>Main Menu</button>
                </div>
            </div>
        </div>
    );
}