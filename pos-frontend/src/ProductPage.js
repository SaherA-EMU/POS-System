import React, {useEffect, useState} from 'react';

function ProductPage(){
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');


// Get all products from the backend
useEffect(() => {
    fetch('http://localhost:3000/products')
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error('Error fetching products:', err));
}, []);

// We need to handle a product actually being clicked on
const addToCart = (product) => {
    setMessage('Added "${product.name}" to cart!');
    setTimeout(() => setMessage(''), 2000);
}

return (
    <div style={{padding: '2rem', fontFamily: 'Arial'}}>
        {message && (
            <div style={{backgroundColor: '#d4edda', padding: '.5rem', borderRadius: '5px', marginBorrom: '1rem'}}>
                {message}
            </div>
        )}

        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat',
                gap: '1rem',
            }}
        >
            {products.map((product) => (
                <div
                    key={product.product_id}
                    onClick={() => addToCart(product)}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '1rem',
                        cursor: 'pointer',
                        backgroundColor: '#F9F9F9'
                    }}
                >
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <p>SKU: {product.sku}</p>
                </div>
            ))}
        </div>      
    </div>
);

}

export default ProductPage;