const express = require('express');
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

// Auto-seed function
const autoSeed = async () => {
    try {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            console.log('No users found, seeding data...');
            await User.create(users);
            await Deal.create(deals);
            console.log('Database seeded successfully!');
        }
    } catch (error) {
        console.error('Auto-seeding failed:', error.message);
    }
};
autoSeed();


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

