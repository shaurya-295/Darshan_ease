const express = require('express');
const router = express.Router();
const { createDonation, getMyDonations, getAllDonations } = require('../controllers/donationController');
const { protect, requireRole } = require('../middleware/auth');

router.post('/', protect, createDonation);
router.get('/my', protect, getMyDonations);
router.get('/', protect, requireRole('ADMIN'), getAllDonations);

module.exports = router;
