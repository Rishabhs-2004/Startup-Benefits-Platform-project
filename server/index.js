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

// Auto-seeding logic
const autoSeed = async () => {
    try {
        const adminEmail = 'admin@gmail.com';
        const adminData = users.find(u => u.email === adminEmail);

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            console.log('Creating admin user...');
            await User.create(adminData);
        } else {
            // Update password to 1122 to be sure
            existingAdmin.password = '1122';
            await existingAdmin.save();
            console.log('Admin password updated to 1122');
        }

        const dealCount = await Deal.countDocuments();
        if (dealCount === 0) {
            await Deal.insertMany(deals);
            console.log('Deals seeded');
        }
    } catch (err) {
        console.error('Seeding error:', err);
    }
};
autoSeed();

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
app.use('/api/claims', require('./routes/claimRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
