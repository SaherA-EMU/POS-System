import React, {useState, useEffect} from "react";
import './Html&Css/style/ItemCart.css';

export default function ItemCart() {

    const[products, setProducts] = useState([]);
    const[cart, setCart] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch products from the backend
    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Error fetching products:', err));
    }, []);

    // Add product to cart
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        setMessage('Added "${product.name}" to cart');
        setTimeout(() => setMessage(''), 2000);
    };

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    return (
        <div className="item-cart">
            {message && <div className="cart-message">{message}</div>}
            <input type="search" className="item-cart-search" placeholder="Search.." />
            <div className="item-cart-container">
                <div className="item-cart-products">
                    {products.map(product => (
                    <div
                        key={product.id}
                        className="item-box"
                        onClick={() => addToCart(product)}
                    >
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>SKU: {product.sku}</p>
                    </div>
                    ))}
                </div>
                <div className="item-cart-totals">
                    <span>Subtotal:</span>
                        <input 
                            type="text" 
                            className="item-cart-subtotal" 
                            value={`$${Number(subtotal).toFixed(2)}`} 
                            disabled/><br/>
                    <span>Tax Amt:</span>
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
                <div className="item-cart-Keypad">
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
                </div>
                <div className="item-cart-payment">
                    <button className="item-cart-POV">Customer POV</button>
                    <button className="item-cart-pay">Pay</button>
                    <button className="item-cart-clear">Clear Cart</button>
                </div>
            </div>
        </div>
    );
}