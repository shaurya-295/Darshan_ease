const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  templeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple',
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DarshanSlot',
    required: true,
  },
  devoteeName: {
    type: String,
    required: [true, 'Devotee name is required'],
  },
  phone: { type: String },
  tickets: {
    type: Number,
    required: true,
    min: [1, 'At least 1 ticket required'],
    max: [6, 'Maximum 6 tickets per booking'],
  },
  poojaType: { type: String },
  visitDate: { type: Date },
  visitTime: { type: String },
  totalAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['CONFIRMED', 'CANCELLED', 'COMPLETED'],
    default: 'CONFIRMED',
  },
  bookingRef: { type: String, unique: true },
}, { timestamps: true });

// Generate booking reference
bookingSchema.pre('save', function (next) {
  if (this.isNew && !this.bookingRef) {
    this.bookingRef = 'DE' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
