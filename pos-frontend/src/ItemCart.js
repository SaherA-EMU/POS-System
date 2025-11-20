import React, {useState, useEffect} from "react";
import './Html&Css/style/ItemCart.css';
import { useNavigate } from 'react-router-dom';

export default function ItemCart() {
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


    const[products, setProducts] = useState([]);
    const[cart, setCart] = useState([]);
    const [message, setMessage] = useState('');

    // This will store variants for the selected product
    const [variants, setVariants] = useState([]);

    // We will need this for popup visibility
    const [showPopup, setShowPopup] = useState(false);

    // User selections inside popup
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    // Fetch products from the backend
    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Error fetching products:', err));
    }, []);

    // Attempting to now show pop-ups of options for products
    const openVariantPopup = (product) => {
        fetch(`http://localhost:5000/variants/${product.product_id}`)
        .then(res => res.json())
        .then(data => {

            const include_name = data.map(varient => ({
                ...varient,
                product_name: product.name
            }));
            setVariants(include_name);
            setSelectedSize("");
            setSelectedColor("");
            setShowPopup(true);
        })
        .catch(err => console.error("Error fetching variants:", err));
    }

    // Add product to cart
    const addToCart = () => {
        if (!selectedSize || !selectedColor) {
            setMessage("Please select both size and color.");
            setTimeout(() => setMessage(""), 2000);
            return;
        }
    

        const itemChosen = variants.find (
            (category) => category.size === selectedSize && category.color === selectedColor
        );

        if (!itemChosen) {
            setMessage("That combination is out of stock.");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        // Count same variant already in the cart
        const alreadyInCart = cart.filter(
            (item) =>
                item.size === itemChosen.size &&
                item.color === itemChosen.color &&
                item.product_id === itemChosen.product_id
        ).length;

        if (alreadyInCart >= itemChosen.quantity) {
            setMessage("No more in stock for that variant!");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        setCart((prevCart) => [...prevCart, itemChosen]);
        setMessage(`Added ${itemChosen.color}/${itemChosen.size} to cart`);
        setShowPopup(false);
        setTimeout(() => setMessage(""), 2000);
    };

    // Remove an item from the cart
    const removeFromCart = (itemToRemove) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== itemToRemove));
        setMessage("Item removed from cart");
        setTimeout(() => setMessage(""), 1500);
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    // Get unique dropdown options
    const availableSizes = [...new Set(variants.map(v => v.size.trim())
    )].sort((a, b) => parseFloat(a) - parseFloat(b));
    
    const availableColors = [...new Set(variants.map(v => v.color))];

    return (
        <div className="item-cart">
            {message && <div className="cart-message">{message}</div>}
            <div className="item-cart-container">
               <div className="item-cart-display-area">
                    <div className='cartnavDiv'>
                        <button className='cartnavbar' onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                        <ul className='cartnavMenu' hidden={!menuOpen}>
                        <button onClick={navigateToHome}>Home</button>
                        <button onClick={navigateToSales}>Sales</button>
                        <button onClick={navigateToEmployee}>Employee</button>
                        <button onClick={navigateToInventory}>Inventory</button>
                        </ul>
                    </div>
                <div className="item-cart-products">
                    {products.map(product => (
                    <div
                        key={product.product_id}
                        className="item-box"
                        onClick={() => openVariantPopup(product)}
                    >
                            <h3>{product.name}</h3>
                    </div>
                    ))}
                </div>
                </div>
                {showPopup && (
                    <div className="popup">
                        <div className="popup-box">
                            <h2>Select Options</h2>

                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="dropdown"
                            >
                                <option value="">Select Size</option>
                                {availableSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="dropdown"
                            >
                                <option value="">Select Color</option>
                                {availableColors.map((color) => (
                                    <option key={color} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                            
                            <div className="popup-buttons">
                                <button className="variant-add-button" onClick={addToCart}>
                                    Add to Cart
                                </button>

                                <button className="close-button" onClick={() => setShowPopup(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="item-cart-cart">
                        <h3>Cart Items</h3>
                        <div className="cart-header">
                            <span>Name</span>
                            <span>Size</span>
                            <span>Color</span>
                            <span>Price</span>
                            <span>Remove</span>
                        </div>
                        <div className="cart-list">
                            {cart.length === 0 && (
                                <p className="empty-cart-msg">No items in cart</p>
                            )}

                            {cart.length > 0 && (
                                cart.map((item, index) => {
                                    return (
                                        <div className="cart-row" key={index}>
                                            {/*Show the item information*/}
                                            <span>{item.product_name || "Item"}</span>
                                            <span>{item.size}</span>
                                            <span>{item.color}</span>
                                            <span>${Number(item.price).toFixed(2)}</span>

                                            <button
                                                className="remove-button"
                                                onClick={() => removeFromCart(index)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                <div className="right-column">
                    <div className="item-cart-totals">
                        <span>Subtotal:</span>
                            <input 
                                type="text" 
                                className="item-cart-subtotal" 
                                value={`$${Number(subtotal).toFixed(2)}`} 
                                disabled/><br/>
                        <span>Tax:</span>
                            <input 
                                type="text" 
                                className="item-cart-tax" 
                                value={`$${Number(tax).toFixed(2)}`} 
                                disabled/><br/>
                        <span>Total:</span>
                            <input 
                                type="text" 
                                className="item-cart-total" 
                                value={`$${Number(total).toFixed(2)}`} 
                                disabled/><br/>
                    </div>
                    
                    {/*<div className="item-cart-Keypad">
                        <div className= "item-cart-display">
                            <input type="text" className="item-cart-display-box" disabled />
                        </div>
                        <div className="item-cart-row">
                            <button className="item-cart-key">7</button>
                            <button className="item-cart-key">8</button>
                            <button className="item-cart-key">9</button>
                        </div>
                        <div className="item-cart-row">
                            <button className="item-cart-key">4</button>
                            <button className="item-cart-key">5</button>
                            <button className="item-cart-key">6</button>
                        </div>
                        <div className="item-cart-row">
                            <button className="item-cart-key">1</button>
                            <button className="item-cart-key">2</button>
                            <button className="item-cart-key">3</button>
                        </div>
                        <div className="item-cart-row">
                            <button className="item-cart-key">0</button>
                            <button className="item-cart-key">.</button>
                            <button className="item-cart-key">c</button>
                        </div>
                    </div> */}
                    <div className="item-cart-payment">
                        <button className="item-cart-cash">Cash</button>
                        <button className="item-cart-card">Card</button>
                    </div> 
                </div>
            </div>
        </div>
    );
}