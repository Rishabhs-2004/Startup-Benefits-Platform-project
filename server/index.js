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

connectDB();

// Auto-seed function with connection wait
const autoSeed = async () => {
    try {
        // Wait for mongoose to be connected (status 1)
        let connectionWait = 0;
        while (mongoose.connection.readyState !== 1 && connectionWait < 10) {
            console.log('Waiting for database connection before seeding...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            connectionWait++;
        }

        const adminEmail = 'admin@gmail.com';
        const adminExists = await User.findOne({ email: adminEmail });

        if (!adminExists) {
            console.log('Admin user not found, seeding admin...');
            const adminData = users.find(u => u.email === adminEmail);
            if (adminData) {
                // Remove password hashing from manual creation if needed, 
                // but User.create triggers the pre-save hook which handles it.
                await User.create(adminData);
                console.log('Admin user created successfully!');
            }
        }

        // Also seed deals if none exist
        const dealCount = await Deal.countDocuments();
        if (dealCount === 0) {
            await Deal.insertMany(deals);
            console.log('Deals seeded successfully!');
        }
    } catch (error) {
        console.error('Auto-seeding failed:', error.message);
    }
};

// Start seeding after a short delay to ensure DB is connecting
setTimeout(autoSeed, 2000);




const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/deals', require('./routes/dealRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Start keep-alive ping if URLs are provided
    if (process.env.RENDER_URL) {
        keepAlive(process.env.RENDER_URL);
    }
    if (process.env.FRONTEND_URL) {
        keepAlive(process.env.FRONTEND_URL);
    }

});

