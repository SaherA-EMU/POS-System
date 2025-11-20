import React from "react";
import './Html&Css/style/MainMenu.css';
import { useNavigate } from "react-router-dom";


export default function InventoryMenu() {
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
        <div class="menu">
            <div className='navDiv'>
                <button className='navbar' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                <ul className='navMenu' hidden={!menuOpen}>
                <button onClick={navigateToHome}>Home</button>
                <button onClick={navigateToSales}>Sales</button>
                <button onClick={navigateToEmployee}>Employee</button>
                <button onClick={navigateToInventory}>Inventory</button>
                </ul>
            </div>
            <button class="ItemLookUp" onclick="alert('this feature is not available yet')">
                <img src={require('./Html&Css/images/loupe.png')} alt="Item Look Up Icon" />
                <span> Item Look Up</span>
            </button>
            <button class="AddItem" onclick="alert('this feature is not available yet')">
                <img src={require('./Html&Css/images/add.png')} alt="Add Item Icon"/>
                <span> Add Item</span>
            </button>
            <button class="LostItem" onclick="alert('this feature is not available yet')">
                <img src={require('./Html&Css/images/lost-items.png')} alt="LostItem" />
                <span> Lost Item</span>
            </button>
        </div>
    );
}