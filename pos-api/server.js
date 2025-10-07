/*
*This sets up the Express server
*/

// Import dependencies
const express = require('express');
const pool = require('./db');
const productsRouter = require('./routes/products');

// Initialize the Express application, which handles HTTP requests and responses
const app = express();	

// Middleware, parse JSON bodies, necessary for POST requests
app.use(express.json());

// Register routes for api calls
app.use('/products', productsRouter);

// Basic route to test the server, request and response
app.get('/', (req, res) => {
  res.send('POS API is running');
});

// Start the server, listening on 3000, use localhost:3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});