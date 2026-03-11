const express = require('express');
const router = express.Router();
const { getTemples, getTemple, createTemple, updateTemple, deleteTemple } = require('../controllers/templeController');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', getTemples);
router.get('/:id', getTemple);
router.post('/', protect, requireRole('ADMIN'), createTemple);
router.put('/:id', protect, requireRole('ADMIN', 'ORGANIZER'), updateTemple);
router.delete('/:id', protect, requireRole('ADMIN'), deleteTemple);

module.exports = router;
