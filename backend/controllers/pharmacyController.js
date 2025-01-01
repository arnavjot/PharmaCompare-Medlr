const Pharmacy = require('../models/Pharmacy');
const mongoose = require('mongoose');

exports.getPharmaciesByMedicine = async (req, res) => {
    const { medicineId, sort = 'price', order = 'asc', limit = 5, page = 1 } = req.query;

    if (!medicineId || !mongoose.Types.ObjectId.isValid(medicineId)) {
        return res.status(400).json({ message: 'Invalid or missing medicine' });
    }
    try {
        const pharmacies = await Pharmacy.find({
            'medicines.medicineId': medicineId
        }).select('name address medicines');
        if (!pharmacies.length) {
            return res.status(404).json({ message: 'No pharmacies found for this medicine' });
        }
        let result = pharmacies.map((pharmacy) => ({
            name: pharmacy.name,
            address: pharmacy.address,
            price: pharmacy.medicines.find((med) => med.medicineId.toString() === medicineId)?.price || 0,
            purchaseLink: pharmacy.medicines.find((med) => med.medicineId.toString() === medicineId)?.purchaseLink || '#'
        }));

        result = result.sort((a, b) => {
            if (sort === 'price') {
                return order === 'desc' ? b.price - a.price : a.price - b.price;
            }
            return 0;
        });

        const paginatedResult = result.slice((page - 1) * limit, page * limit);
        const totalPharmacies = result.length;
        const totalPages = Math.ceil(totalPharmacies / limit);
        res.status(200).json({ pharmacies: paginatedResult, currentPage: parseInt(page), totalPages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pharmacies', error });
    }
};
