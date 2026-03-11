const Temple = require('../models/Temple');

// GET all temples
const getTemples = async (req, res, next) => {
  try {
    const { region, search } = req.query;
    let query = { isActive: true };
    if (region) query.region = region;
    if (search) query.name = { $regex: search, $options: 'i' };
    const temples = await Temple.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: temples.length, data: temples });
  } catch (err) { next(err); }
};

// GET single temple
const getTemple = async (req, res, next) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ success: false, message: 'Temple not found' });
    res.json({ success: true, data: temple });
  } catch (err) { next(err); }
};

// POST create temple (Admin)
const createTemple = async (req, res, next) => {
  try {
    const temple = await Temple.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: temple });
  } catch (err) { next(err); }
};

// PUT update temple (Admin)
const updateTemple = async (req, res, next) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!temple) return res.status(404).json({ success: false, message: 'Temple not found' });
    res.json({ success: true, data: temple });
  } catch (err) { next(err); }
};

// DELETE temple (Admin)
const deleteTemple = async (req, res, next) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!temple) return res.status(404).json({ success: false, message: 'Temple not found' });
    res.json({ success: true, message: 'Temple removed' });
  } catch (err) { next(err); }
};

module.exports = { getTemples, getTemple, createTemple, updateTemple, deleteTemple };
