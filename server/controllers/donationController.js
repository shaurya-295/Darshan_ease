const Donation = require('../models/Donation');

// POST make donation
const createDonation = async (req, res, next) => {
  try {
    const donation = await Donation.create({ ...req.body, userId: req.user._id });
    res.status(201).json({ success: true, data: donation });
  } catch (err) { next(err); }
};

// GET my donations
const getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ userId: req.user._id })
      .populate('templeId', 'name location')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: donations });
  } catch (err) { next(err); }
};

// GET all donations (Admin)
const getAllDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find()
      .populate('userId', 'name email')
      .populate('templeId', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: donations });
  } catch (err) { next(err); }
};

module.exports = { createDonation, getMyDonations, getAllDonations };
