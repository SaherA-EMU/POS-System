/*
*This sets up the Express server
*/

// Import dependencies
const express = require('express');
const pool = require('./db');
const productsRouter = require('./routes/products');
const cors = require('cors');
const variantsRouter = require('./routes/variants');
const salesRouter = require('./routes/sales');
const authRouter = require('./routes/auth');


// Initialize the Express application, which handles HTTP requests and responses
const app = express();	

// Middleware, parse JSON bodies, necessary for POST requests
app.use(express.json());
app.use(cors());

// Register routes for api calls
app.use('/variants', variantsRouter);

app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use('/auth', authRouter);

// Basic route to test the server, request and response
app.get('/', (req, res) => {
  res.send('POS API is running');
});

// Start the server, listening on 5000, use localhost:5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});