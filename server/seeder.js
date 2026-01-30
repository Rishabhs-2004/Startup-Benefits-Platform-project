const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const deals = require('./data/deals');
const User = require('./models/User');
const Deal = require('./models/Deal');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Deal.deleteMany();
        await User.deleteMany();

        const createdUsers = [];
        for (const user of users) {
            const newUser = await User.create(user);
            createdUsers.push(newUser);
        }

        const adminUser = createdUsers[0]._id;

        const sampleDeals = deals.map((deal) => {
            return { ...deal };
        });

        await Deal.insertMany(sampleDeals);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Deal.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
