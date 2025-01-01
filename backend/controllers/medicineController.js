const Medicine = require('../models/Medicine');

exports.getMedicines = async (req, res) => {
  const { name } = req.query;
  try {
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const medicines = await Medicine.find(filter);
    res.status(200).json({ medicines });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};

exports.getMedicineById = async (req, res) => {
  const { id } = req.params;
  try {
    const medicine = await Medicine.findById(id);
    if (!medicine) {
      return res.status(404).json({ message: 'medcine not found' });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};
