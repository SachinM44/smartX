const express = require('express');
const cors = require('cors');
const { connectDB } = require('./DB/schema');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/bookings', require('./routes/bookings'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Activity Booking API' });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});