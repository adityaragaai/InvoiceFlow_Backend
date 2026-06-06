const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    company: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

customerSchema.index({ company: 1 });

module.exports = mongoose.model('Customer', customerSchema);
