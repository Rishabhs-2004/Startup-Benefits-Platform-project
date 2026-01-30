const asyncHandler = require('express-async-handler');
const Deal = require('../models/Deal');

// @desc    Get all deals
// @route   GET /api/deals
// @access  Public
const getDeals = asyncHandler(async (req, res) => {
    const deals = await Deal.find();
    res.status(200).json(deals);
});

// @desc    Get single deal
// @route   GET /api/deals/:id
// @access  Public
const getDealById = asyncHandler(async (req, res) => {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
        res.status(404);
        throw new Error("Deal not found");
    }
    res.status(200).json(deal);
});

// @desc    Set deal
// @route   POST /api/deals
// @access  Private/Admin
const createDeal = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400);
        throw new Error('Please add a title and description');
    }

    const deal = await Deal.create(req.body);

    res.status(200).json(deal);
});

// @desc    Update deal
// @route   PUT /api/deals/:id
// @access  Private/Admin
const updateDeal = asyncHandler(async (req, res) => {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
        res.status(400);
        throw new Error('Deal not found');
    }

    const updatedDeal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedDeal);
});

// @desc    Delete deal
// @route   DELETE /api/deals/:id
// @access  Private/Admin
const deleteDeal = asyncHandler(async (req, res) => {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
        res.status(400);
        throw new Error('Deal not found');
    }

    await deal.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getDeals,
    getDealById,
    createDeal,
    updateDeal,
    deleteDeal,
};
