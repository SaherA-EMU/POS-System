import React from 'react';
import './Html&Css/style/MainMenu.css';
import { useNavigate } from 'react-router-dom';

   
function MainMenu() {
    const navigate = useNavigate();
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
            <button className="sales" onClick={navigateToSales}>
                <img src={require('./Html&Css/images/cashier.png')} alt="Sales Icon"/>
                <span>Sales</span>
            </button>
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
        </div> );
}
export default MainMenu;