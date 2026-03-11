const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Temple name is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  state: { type: String },
  description: { type: String },
  deity: { type: String },
  image: { type: String, default: '' },
  timings: { type: String },
  region: {
    type: String,
    enum: ['North India', 'South India', 'East India', 'West India'],
  },
  tags: [{ type: String }],
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema);
