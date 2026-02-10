const express = require('express');
const router = express.Router();
const {
    claimDeal,
    getMyClaims,
    getAllClaims,
    updateClaimStatus
} = require('../controllers/claimController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getAllClaims)
    .post(protect, claimDeal);

router.get('/my-claims', protect, getMyClaims);

router.route('/:id')
    .put(protect, admin, updateClaimStatus);

module.exports = router;
