const express = require('express');
const router = express.Router();
const { getSlotsByTemple, createSlot, updateSlot, deleteSlot } = require('../controllers/slotController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/temple/:templeId', getSlotsByTemple);
router.post('/', protect, requireRole('ADMIN', 'ORGANIZER'), createSlot);
router.put('/:id', protect, requireRole('ADMIN', 'ORGANIZER'), updateSlot);
router.delete('/:id', protect, requireRole('ADMIN'), deleteSlot);

module.exports = router;
