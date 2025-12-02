import React from 'react';
import { useAuth } from './context/AuthContext';
import './Html&Css/style/MainMenu.css';
import { useNavigate } from "react-router-dom";

export default function EmployeeMenu() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);

    // Fetch employees from database
    const [allEmployees, setAllEmployees] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    const navigateToHome = () => navigate('/');
    const navigateToSales = () => navigate('/SalesMenu');
    const navigateToInventory = () => navigate('/InventoryMenu');
    const { currentUser, logout } = useAuth();

    // Fetch employees from database on component mount
    React.useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const res = await fetch('http://localhost:5000/employees');
                if (!res.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await res.json();
                setAllEmployees(data);
                setError('');
            } catch (err) {
                console.error('Error fetching employees:', err);
                setError('Unable to load employees from database');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <div className='navDiv'>
                <button className='navbar' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                <ul className='navMenu' hidden={!menuOpen}>
                    <button onClick={navigateToHome}>Home</button>
                    <button onClick={navigateToSales}>Sales</button>
                    <button onClick={() => navigate('/EmployeeMenu')}>Employee</button>
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
                <h2>Employee Management</h2>

                {/* Employees Display */}
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
                        <p style={{ textAlign: 'center', color: '#666' }}>Loading employees...</p>
                    ) : error ? (
                        <p style={{ textAlign: 'center', color: '#d9534f' }}>{error}</p>
                    ) : allEmployees.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666' }}>No employees to display</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid goldenrod' }}>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Employee ID</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allEmployees.map(employee => (
                                    <tr key={employee.employee_id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '10px' }}>{employee.employee_id}</td>
                                        <td style={{ padding: '10px' }}>{employee.name}</td>
                                        <td style={{ padding: '10px' }}>{employee.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={navigateToHome}>Main Menu</button>
                </div>
            </div>
        </div>
    );
}
