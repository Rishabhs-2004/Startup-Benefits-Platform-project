const express = require('express');
const router = express.Router();
const {
    getDeals,
    createDeal,
    updateDeal,
    deleteDeal,
    getDealById,
} = require('../controllers/dealController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getDeals).post(protect, admin, createDeal);
router.route('/:id').delete(protect, admin, deleteDeal).put(protect, admin, updateDeal).get(getDealById);

module.exports = router;
