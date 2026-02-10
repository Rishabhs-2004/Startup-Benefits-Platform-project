const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a deal title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Design', 'Development', 'Marketing', 'Productivity', 'Finance', 'Other'],
    },
    discount: {
        type: String,
        required: [true, 'Please add discount details'],
    },
    partnerName: {
        type: String,
        required: [true, 'Please add partner name'],
    },
    logoUrl: {
        type: String,
        default: 'https://via.placeholder.com/150', // Placeholder
    },
    redemptionLink: {
        type: String,
        required: false,
    },
    accessLevel: {
        type: String,
        enum: ['public', 'restricted'],
        default: 'public',
    },
    eligibilityConditions: {
        type: String,
        default: 'All early-stage startups are eligible.',
    },
    featured: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Deal', dealSchema);
