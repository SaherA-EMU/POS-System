import './Html&Css/style/MainMenu.css';
import React from 'react';
import { useAuth } from './Context/AuthContext';
import ManagerOverrideModal from './components/ManagerOverrideModal';
import { useNavigate } from 'react-router-dom';

export default function SalesMenu() {
        const navigate = useNavigate();
        const { currentUser, logout, isManager } = useAuth();

        const navigateToItemCart = () => 
         navigate('/ItemCart');
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [showManagerModal, setShowManagerModal] = React.useState(false);
    const [pendingRoute, setPendingRoute] = React.useState('');

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
            {showManagerModal && (
                <ManagerOverrideModal
                    onApprove={handleManagerApprove}
                    onCancel={() => setShowManagerModal(false)}
                />
            )}
            <button 
                className="History" 
                onClick={() => requireManagerAccess("/TransactionHistory")}
                >
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
