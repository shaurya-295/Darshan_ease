const Booking = require('../models/Booking');
const DarshanSlot = require('../models/DarshanSlot');

// POST create booking
const createBooking = async (req, res, next) => {
  try {
    const { slotId, templeId, devoteeName, phone, tickets, poojaType, visitDate, visitTime } = req.body;

    const slot = await DarshanSlot.findById(slotId);
    if (!slot) return res.status(404).json({ success: false, message: 'Slot not found' });
    if (slot.availableSeats < tickets)
      return res.status(400).json({ success: false, message: `Only ${slot.availableSeats} seats available` });

    // Decrement seats
    slot.availableSeats -= tickets;
    await slot.save();

    const totalAmount = slot.price * tickets + 5; // +5 convenience fee
    const booking = await Booking.create({
      userId: req.user._id,
      templeId,
      slotId,
      devoteeName,
      phone,
      tickets,
      poojaType,
      visitDate,
      visitTime,
      totalAmount,
    });

    await booking.populate(['templeId', 'slotId']);
    res.status(201).json({ success: true, data: booking });
  } catch (err) { next(err); }
};

// GET my bookings
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('templeId', 'name location image')
      .populate('slotId', 'date time poojaType price')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) { next(err); }
};

// PUT cancel booking
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN')
      return res.status(403).json({ success: false, message: 'Not authorized' });
    if (booking.status === 'CANCELLED')
      return res.status(400).json({ success: false, message: 'Already cancelled' });

    // Restore seats
    await DarshanSlot.findByIdAndUpdate(booking.slotId, { $inc: { availableSeats: booking.tickets } });
    booking.status = 'CANCELLED';
    await booking.save();
    res.json({ success: true, data: booking });
  } catch (err) { next(err); }
};

// GET all bookings (Admin)
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('templeId', 'name location')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) { next(err); }
};

module.exports = { createBooking, getMyBookings, cancelBooking, getAllBookings };
