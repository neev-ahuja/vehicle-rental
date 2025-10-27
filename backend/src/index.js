const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const vehicleRouter = require('./routes/vehicleRoutes');
const userRouter = require('./routes/userRoutes');

// Load environment variables
dotenv.config();
// Port
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));
app.use(cookieParser());


// Routes
app.use('/vehicles' , vehicleRouter);
app.use('/users' ,userRouter);  


// Listen
app.listen(PORT , () => console.log(`Server running on port ${PORT}`));