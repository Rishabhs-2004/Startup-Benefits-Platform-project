const asyncHandler = require('express-async-handler');
const Claim = require('../models/Claim');
const Deal = require('../models/Deal');

// @desc    Claim a deal
// @route   POST /api/claims
// @access  Private
const claimDeal = asyncHandler(async (req, res) => {
    const { dealId } = req.body;

    const deal = await Deal.findById(dealId);

    if (!deal) {
        res.status(404);
        throw new Error('Deal not found');
    }

    // Check if it's restricted and user is verified
    if (deal.accessLevel === 'restricted' && !req.user.isVerified) {
        res.status(403);
        throw new Error('This deal is restricted to verified users only.');
    }

    // Check if already claimed
    const existingClaim = await Claim.findOne({
        user: req.user._id,
        deal: dealId
    });

    if (existingClaim) {
        res.status(400);
        throw new Error('You have already claimed this deal');
    }

    const claim = await Claim.create({
        user: req.user._id,
        deal: dealId,
        status: 'pending' // Default status
    });

    res.status(201).json(claim);
});

// @desc    Get user's claimed deals
// @route   GET /api/claims/my-claims
// @access  Private
const getMyClaims = asyncHandler(async (req, res) => {
    const claims = await Claim.find({ user: req.user._id })
        .populate('deal')
        .sort('-createdAt');

    res.json(claims);
});

// @desc    Get all claims (Admin only)
// @route   GET /api/claims
// @access  Private/Admin
const getAllClaims = asyncHandler(async (req, res) => {
    const claims = await Claim.find({})
        .populate('user', 'name email')
        .populate('deal')
        .sort('-createdAt');

    res.json(claims);
});

// @desc    Update claim status (Admin only)
// @route   PUT /api/claims/:id
// @access  Private/Admin
const updateClaimStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
        res.status(404);
        throw new Error('Claim not found');
    }

    claim.status = status;
    const updatedClaim = await claim.save();

    res.json(updatedClaim);
});

module.exports = {
    claimDeal,
    getMyClaims,
    getAllClaims,
    updateClaimStatus
};
