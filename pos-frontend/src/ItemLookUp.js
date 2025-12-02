import React from 'react';
import { useAuth } from './context/AuthContext';
import './Html&Css/style/MainMenu.css';
import { useNavigate } from "react-router-dom";

export default function ItemLookUp() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);

    // Fetch items from database
    const [allItems, setAllItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    // Filter states
    const [filters, setFilters] = React.useState({
        name: '',
        size: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        minQuantity: ''
    });

    const navigateToHome = () => navigate('/');
    const navigateToSales = () => navigate('/SalesMenu');
    const navigateToInventory = () => navigate('/InventoryMenu');
    const navigateToEmployee = () => navigate('/EmployeeMenu');
    const { currentUser, logout } = useAuth();

    // Fetch items from database on component mount
    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const res = await fetch('http://localhost:5000/variants');
                if (!res.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await res.json();
                setAllItems(data);
                setError('');
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Unable to load items from database');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Filter items based on current filters
    const filteredItems = allItems.filter(item => {
        if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
        if (filters.size && !item.size.toLowerCase().includes(filters.size.toLowerCase())) return false;
        if (filters.color && !item.color.toLowerCase().includes(filters.color.toLowerCase())) return false;
        if (filters.minPrice && item.price < parseFloat(filters.minPrice)) return false;
        if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) return false;
        if (filters.minQuantity && item.quantity < parseInt(filters.minQuantity)) return false;
        return true;
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const clearFilters = () => {
        setFilters({
            name: '',
            size: '',
            color: '',
            minPrice: '',
            maxPrice: '',
            minQuantity: ''
        });
    };

    // Handle reporting item as lost
    const handleReportLost = async (item) => {
        // Show confirmation dialog
        const confirmed = window.confirm(
            `Report this item as lost and delete from inventory?\n\n` +
            `Variant ID: ${item.variant_id}\n` +
            `Name: ${item.name}\n` +
            `Size: ${item.size}\n` +
            `Color: ${item.color}\n` +
            `Price: $${parseFloat(item.price).toFixed(2)}\n` +
            `Quantity: ${item.quantity}`
        );

        if (!confirmed) {
            return; // User clicked Cancel
        }

        try {
            const res = await fetch(`http://localhost:5000/variants/${item.variant_id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const data = await res.json();
                alert(`Error: ${data.error || 'Failed to delete item'}`);
                return;
            }

            // Remove the item from the local state to update UI
            setAllItems(prevItems => prevItems.filter(i => i.variant_id !== item.variant_id));
            alert('Item reported as lost and removed from inventory');
        } catch (err) {
            console.error('Error deleting item:', err);
            alert('Unable to connect to server');
        }
    };

    return (
        <div>
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
            <div style={{ padding: '20px', width: '80vw', margin: '0 auto', paddingTop: '120px', boxSizing: 'border-box' }}>
                <h2>Inventory Lookup</h2>

                {/* Filter Section */}
                <div style={{
                    backgroundColor: 'white',
                    border: '2px solid goldenrod',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '20px'
                }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#1f1f1f' }}>Filters</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={filters.name}
                            onChange={(e) => handleFilterChange('name', e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="text"
                            placeholder="Size"
                            value={filters.size}
                            onChange={(e) => handleFilterChange('size', e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="text"
                            placeholder="Color"
                            value={filters.color}
                            onChange={(e) => handleFilterChange('color', e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <input
                            type="number"
                            placeholder="Min Quantity"
                            value={filters.minQuantity}
                            onChange={(e) => handleFilterChange('minQuantity', e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button
                        onClick={clearFilters}
                        style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            width: 'auto',
                            height: 'auto'
                        }}
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Items Display */}
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
                    {loading ? (
                        <p style={{ textAlign: 'center', color: '#666' }}>Loading items...</p>
                    ) : error ? (
                        <p style={{ textAlign: 'center', color: '#d9534f' }}>{error}</p>
                    ) : filteredItems.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666' }}>No items to display</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid goldenrod' }}>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Variant ID</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Size</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Color</th>
                                    <th style={{ padding: '10px', textAlign: 'right' }}>Price</th>
                                    <th style={{ padding: '10px', textAlign: 'right' }}>Quantity</th>
                                    <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.variant_id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>{item.variant_id}</td>
                                        <td style={{ padding: '10px' }}>{item.name}</td>
                                        <td style={{ padding: '10px' }}>{item.size}</td>
                                        <td style={{ padding: '10px' }}>{item.color}</td>
                                        <td style={{ padding: '10px', textAlign: 'right' }}>${parseFloat(item.price).toFixed(2)}</td>
                                        <td style={{ padding: '10px', textAlign: 'right' }}>{item.quantity}</td>
                                        <td style={{ padding: '10px', textAlign: 'center' }}>
                                            <button
                                                onClick={() => handleReportLost(item)}
                                                style={{
                                                    padding: '3px 8px',
                                                    backgroundColor: '#d9534f',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '3px',
                                                    cursor: 'pointer',
                                                    fontSize: '11px',
                                                    height: 'auto',
                                                    width: 'auto',
                                                    margin: '0',
                                                    display: 'inline-block',
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                Report Lost
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={navigateToInventory}>Back to Inventory</button>
                    <button onClick={navigateToHome}>Main Menu</button>
                </div>
            </div>
        </div>
    );
}