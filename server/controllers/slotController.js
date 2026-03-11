const DarshanSlot = require('../models/DarshanSlot');

// GET slots by temple
const getSlotsByTemple = async (req, res, next) => {
  try {
    const { date } = req.query;
    let query = { templeId: req.params.templeId, isActive: true };
    if (date) {
      const start = new Date(date); start.setHours(0,0,0,0);
      const end = new Date(date); end.setHours(23,59,59,999);
      query.date = { $gte: start, $lte: end };
    }
    const slots = await DarshanSlot.find(query).sort({ date: 1, time: 1 });
    res.json({ success: true, data: slots });
  } catch (err) { next(err); }
};

// POST create slot (Admin/Organizer)
const createSlot = async (req, res, next) => {
  try {
    const slot = await DarshanSlot.create({
      ...req.body,
      availableSeats: req.body.availableSeats ?? req.body.totalSeats,
    });
    res.status(201).json({ success: true, data: slot });
  } catch (err) { next(err); }
};

// PUT update slot
const updateSlot = async (req, res, next) => {
  try {
    const slot = await DarshanSlot.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!slot) return res.status(404).json({ success: false, message: 'Slot not found' });
    res.json({ success: true, data: slot });
  } catch (err) { next(err); }
};

// DELETE slot
const deleteSlot = async (req, res, next) => {
  try {
    const slot = await DarshanSlot.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!slot) return res.status(404).json({ success: false, message: 'Slot not found' });
    res.json({ success: true, message: 'Slot removed' });
  } catch (err) { next(err); }
};

module.exports = { getSlotsByTemple, createSlot, updateSlot, deleteSlot };
