const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const keepAlive = require('./utils/keepAlive');
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

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/test', (req, res) => {
    res.json({
        message: 'Backend is working!',
        dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting/Disconnected',
        uptime: process.uptime()
    });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/deals', require('./routes/dealRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DB then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);

        // Auto-seeding logic
        const autoSeed = async () => {
            try {
                const adminEmail = 'admin@gmail.com';
                const adminExists = await User.findOne({ email: adminEmail });
                if (!adminExists) {
                    console.log('Seeding admin user...');
                    const adminData = users.find(u => u.email === adminEmail);
                    if (adminData) await User.create(adminData);
                }
                const dealCount = await Deal.countDocuments();
                if (dealCount === 0) await Deal.insertMany(deals);
            } catch (err) {
                console.error('Seeding error:', err.message);
            }
        };
        autoSeed();

        // Keep-alive
        if (process.env.RENDER_URL) keepAlive(process.env.RENDER_URL);
        if (process.env.FRONTEND_URL) keepAlive(process.env.FRONTEND_URL);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
