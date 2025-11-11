import React, {useState, useEffect} from "react";
import './Html&Css/style/ItemCart.css';

export default function ItemCart() {

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
    const openVariantPopup = (product_id) => {
        fetch(`http://localhost:5000/variants/${product_id}`)
        .then(res => res.json())
        .then(data => {
            setVariants(data);
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
    

        const chosenVariant = variants.find (
            (v) => v.size === selectedSize && v.color === selectedColor
        );

        if (!chosenVariant) {
            setMessage("That combination is out of stock.");
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        setCart((prevCart) => [...prevCart, chosenVariant]);
        setMessage(`Added ${chosenVariant.color}/${chosenVariant.size} to cart`);
        setShowPopup(false);
        setTimeout(() => setMessage(""), 2000);
    };

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    // Get unique dropdown options
    const availableSizes = [...new Set(variants.map((v) => v.size))];
    const availableColors = [...new Set(variants.map((v) => v.color))];

    return (
        <div className="item-cart">
            {message && <div className="cart-message">{message}</div>}
            <input type="search" className="item-cart-search" placeholder="Search.." />
            <div className="item-cart-container">
               <div className="item-cart-display-area">
                <div className="item-cart-products">
                    {products.map(product => (
                    <div
                        key={product.product_id}
                        className="item-box"
                        onClick={() => openVariantPopup(Number(product.product_id))}
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
                                <button className="variant-add-btn" onClick={addToCart}>
                                    Add to Cart
                                </button>

                                <button className="close-btn" onClick={() => setShowPopup(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
                <div className="item-cart-cart">
                    <h2>Cart Items</h2>
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
                    <button className="item-cart-POV">Customer POV</button>
                    <button className="item-cart-pay">Pay</button>
                    <button className="item-cart-clear">Clear Cart</button>
                </div> 
            </div>
        </div>
    );
}