const mongoose = require('mongoose');

const darshanSlotSchema = new mongoose.Schema({
  templeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple',
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'Slot date is required'],
  },
  time: {
    type: String,
    required: [true, 'Slot time is required'],
  },
  poojaType: {
    type: String,
    enum: ['General Darshan', 'VIP Darshan', 'Abhishekam', 'Prasad Booking'],
    default: 'General Darshan',
  },
  totalSeats: {
    type: Number,
    required: true,
    default: 50,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Set availableSeats = totalSeats before first save
darshanSlotSchema.pre('save', function (next) {
  if (this.isNew && this.availableSeats === undefined) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

module.exports = mongoose.model('DarshanSlot', darshanSlotSchema);
