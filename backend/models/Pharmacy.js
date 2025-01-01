const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  medicines: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      price: { type: Number, required: true },
      purchaseLink: { type: String },
    },
  ],
});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
