const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking, getAllBookings } = require('../controllers/bookingController');
const { protect, requireRole } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.put('/:id/cancel', protect, cancelBooking);
router.get('/', protect, requireRole('ADMIN'), getAllBookings);

module.exports = router;
