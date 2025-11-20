import './Html&Css/style/MainMenu.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SalesMenu() {
        const navigate = useNavigate();

        const navigateToItemCart = () => 
         navigate('/ItemCart');
    const [menuOpen, setMenuOpen] = React.useState(false);
        
        const navigateToHome = () => 
            navigate('/'); //navigate to Home route
        const navigateToSales = () => 
            navigate('/SalesMenu'); //navigate to SalesMenu route 
        const navigateToInventory = () =>
            navigate('/InventoryMenu'); //navigate to InventoryMenu route
    
    return (
        
        <div className="menu">
            <div className='navDiv'>
                <button className='navbar' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                <ul className='navMenu' hidden={!menuOpen}>
                <button onClick={navigateToHome}>Home</button>
                <button onClick={navigateToSales}>Sales</button>
                <button onClick={navigateToInventory}>Employee</button>
                <button>Admin</button>
                </ul>
            </div>
            <button className="History" onClick={ () => alert('this feature is not available yet')}>
                <img src={require('./Html&Css/images/history.png')} alt="History Icon" />
                <span> Transaction History</span>
            </button>
            <button className="Transaction" onClick={navigateToItemCart}>
                <img src={require('./Html&Css/images/dollar-symbol.png')} alt="Dollar Sign" />
                <span> Make a Sale</span>
            </button>
            <button className="Reports" onClick={ () => alert('this feature is not available yet')}>
                <img src={require('./Html&Css/images/report.png')} alt="Reports Icon" />
                <span> Reports </span>
            </button>
        </div>
        );
        }
