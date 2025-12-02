import React from "react";
import { useAuth } from './context/AuthContext';
import './Html&Css/style/MainMenu.css';
import { useNavigate } from "react-router-dom";


export default function AddItem() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        size: '',
        color: '',
        price: '',
        quantity: ''
    });

    const navigateToHome = () =>
        navigate('/'); //navigate to Home route
    const { currentUser, logout } = useAuth();
    const navigateToSales = () =>
        navigate('/SalesMenu'); //navigate to SalesMenu route
    const navigateToInventory = () =>
        navigate('/InventoryMenu'); //navigate to InventoryMenu route
    const navigateToEmployee = () =>
       navigate('/EmployeeMenu'); //navigate to EmployeeMenu route
    const navigateToItemLookup = () =>
        navigate('/ItemLookUp'); //navigate to ItemLookUp route

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // If name changes, reset size and color, and set appropriate default for accessories
        if (name === 'name') {
            if (value === 'Accessories') {
                setFormData(prev => ({
                    ...prev,
                    name: value,
                    size: 'One Size Fits All',
                    color: ''
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    name: value,
                    size: '',
                    color: ''
                }));
            }
        }
    };

    // Generate size options based on selected item type
    const getSizeOptions = () => {
        switch (formData.name) {
            case 'Suits':
                // 36, 38, 40, ..., 50
                return Array.from({ length: 8 }, (_, i) => 36 + i * 2);
            case 'Pants':
                // 28, 30, 32, ..., 46
                return Array.from({ length: 10 }, (_, i) => 28 + i * 2);
            case 'Shoes':
                // 7.0, 7.5, 8.0, ..., 12.0
                return Array.from({ length: 11 }, (_, i) => (7.0 + i * 0.5).toFixed(1));
            case 'Shirt':
                // 15.5, 16.0, 16.5, ..., 18.5
                return Array.from({ length: 7 }, (_, i) => (15.5 + i * 0.5).toFixed(1));
            case 'Accessories':
                return ['One Size Fits All'];
            default:
                return [];
        }
    };

    // Generate color options based on selected item type
    const getColorOptions = () => {
        switch (formData.name) {
            case 'Suits':
                return ['BLACK', 'BROWN', 'GREY', 'NAVY', 'TAN'];
            case 'Pants':
                return ['BLACK', 'BROWN', 'GREY', 'NAVY', 'TAN'];
            case 'Shoes':
                return ['BLACK', 'BROWN', 'BURGANDY', 'NAVY', 'TAN'];
            case 'Accessories':
                return ['BELT', 'CUFFLINKS', 'SOCKS', 'SUSPENDERS', 'TIE'];
            case 'Shirt':
                return ['CREAM', 'BLUE', 'BLACK', 'WHITE', 'PINK', 'RED'];
            default:
                return [];
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Database implementation will be added later
        console.log('Item data:', formData);
    };

    return (
        <div>
            <div className="navDiv">
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

            <div style={{ padding: '20px', width: '80vw', margin: '0 auto', paddingTop: '120px', boxSizing: 'border-box' }}>
                <h2>Add New Item</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                        <select
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        >
                            <option value="">Select an item type</option>
                            <option value="Suits">Suits</option>
                            <option value="Pants">Pants</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Shirt">Shirt</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Size:</label>
                        {formData.name === '' ? (
                            <input
                                type="text"
                                name="size"
                                value=""
                                disabled
                                placeholder="Please select an item type first"
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: '#f0f0f0' }}
                            />
                        ) : formData.name === 'Accessories' ? (
                            <input
                                type="text"
                                name="size"
                                value="One Size Fits All"
                                disabled
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: '#f0f0f0' }}
                            />
                        ) : (
                            <select
                                name="size"
                                value={formData.size}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                            >
                                <option value="">Select a size</option>
                                {getSizeOptions().map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Color:</label>
                        {formData.name === '' ? (
                            <input
                                type="text"
                                name="color"
                                value=""
                                disabled
                                placeholder="Please select an item type first"
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: '#f0f0f0' }}
                            />
                        ) : (
                            <select
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                            >
                                <option value="">Select a color</option>
                                {getColorOptions().map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            step="0.01"
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Add Item
                    </button>
                </form>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={navigateToInventory}>Back to Inventory</button>
                    <button onClick={navigateToHome}>Main Menu</button>
                </div>
            </div>
        </div>
    );
}