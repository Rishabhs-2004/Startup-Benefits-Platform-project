const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const User = require('./models/User');
const users = require('./data/users');
const Deal = require('./models/Deal');
const deals = require('./data/deals');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Connect to DB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/test', (req, res) => {
    res.json({
        message: 'Backend is working!',
        dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting',
        timestamp: new Date()
    });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/deals', require('./routes/dealRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
