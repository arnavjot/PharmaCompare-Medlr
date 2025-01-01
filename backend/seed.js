const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Medicine = require('./models/Medicine');
const Pharmacy = require('./models/Pharmacy');
const User = require('./models/User');
dotenv.config();
const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await Medicine.deleteMany();
        await Pharmacy.deleteMany();
        await User.deleteMany();//existing delete
        const medicines = [
            { name: 'Paracetamol', description: 'Pain relief and fever reducer' },
            { name: 'Ibuprofen', description: 'Anti-inflammatory and pain relief' },
            { name: 'Amoxicillin', description: 'Antibiotic for bacterial infections' },
            { name: 'Cetirizine', description: 'Allergy relief medication' },
            { name: 'Metformin', description: 'Controls blood sugar levels in type 2 diabetes' },
            { name: 'Aspirin', description: 'Pain reliever and anti-inflammatory medication' },
            { name: 'Lisinopril', description: 'Treats high blood pressure' },
            { name: 'Levothyroxine', description: 'Treats hypothyroidism' },
            { name: 'Atorvastatin', description: 'Reduces cholesterol levels' },
            { name: 'Omeprazole', description: 'Reduces stomach acid' },
            { name: 'Simvastatin', description: 'Treats high cholesterol' },
            { name: 'Clopidogrel', description: 'Prevents blood clots' },
            { name: 'Hydrochlorothiazide', description: 'Treats high blood pressure' },
            { name: 'Losartan', description: 'Treats high blood pressure' },
            { name: 'Citalopram', description: 'Antidepressant medication' },
            { name: 'Sertraline', description: 'Treats depression and anxiety' },
            { name: 'Alprazolam', description: 'Treats anxiety and panic disorders' },
            { name: 'Trazodone', description: 'Treats depression and sleep disorders' },
            { name: 'Fluticasone', description: 'Treats allergies and asthma' },
            { name: 'Furosemide', description: 'Treats fluid retention and high blood pressure' },
        ];
        const savedMedicines = await Medicine.insertMany(medicines);
        console.log('Sample medicines added:', savedMedicines);
        const pharmacies = [
            {
              name: 'Pharmacy 1',
              address: '100 Main St, City 1',
              medicines: [
                { medicineId: savedMedicines[0]._id, price: 10, purchaseLink: 'http://pharmacy1.com/buy/Paracetamol' },
                { medicineId: savedMedicines[1]._id, price: 12, purchaseLink: 'http://pharmacy1.com/buy/Ibuprofen' },
                { medicineId: savedMedicines[2]._id, price: 15, purchaseLink: 'http://pharmacy1.com/buy/Amoxicillin' },
                { medicineId: savedMedicines[3]._id, price: 8, purchaseLink: 'http://pharmacy1.com/buy/Cetirizine' },
                { medicineId: savedMedicines[4]._id, price: 9, purchaseLink: 'http://pharmacy1.com/buy/Metformin' },
              ],
            },
            {
              name: 'Pharmacy 2',
              address: '101 Main St, City 2',
              medicines: [
                { medicineId: savedMedicines[5]._id, price: 10, purchaseLink: 'http://pharmacy2.com/buy/Aspirin' },
                { medicineId: savedMedicines[6]._id, price: 12, purchaseLink: 'http://pharmacy2.com/buy/Lisinopril' },
                { medicineId: savedMedicines[7]._id, price: 11, purchaseLink: 'http://pharmacy2.com/buy/Levothyroxine' },
                { medicineId: savedMedicines[0]._id, price: 11, purchaseLink: 'http://pharmacy2.com/buy/Paracetamol' },
                { medicineId: savedMedicines[1]._id, price: 14, purchaseLink: 'http://pharmacy2.com/buy/Ibuprofen' },
              ],
            },
            {
              name: 'Pharmacy 3',
              address: '102 Main St, City 3',
              medicines: [
                { medicineId: savedMedicines[8]._id, price: 13, purchaseLink: 'http://pharmacy3.com/buy/Atorvastatin' },
                { medicineId: savedMedicines[9]._id, price: 15, purchaseLink: 'http://pharmacy3.com/buy/Omeprazole' },
                { medicineId: savedMedicines[2]._id, price: 14, purchaseLink: 'http://pharmacy3.com/buy/Amoxicillin' },
                { medicineId: savedMedicines[3]._id, price: 10, purchaseLink: 'http://pharmacy3.com/buy/Cetirizine' },
                { medicineId: savedMedicines[4]._id, price: 16, purchaseLink: 'http://pharmacy3.com/buy/Metformin' },
              ],
            },
            {
              name: 'Pharmacy 4',
              address: '103 Main St, City 4',
              medicines: [
                { medicineId: savedMedicines[10]._id, price: 10, purchaseLink: 'http://pharmacy4.com/buy/Simvastatin' },
                { medicineId: savedMedicines[11]._id, price: 11, purchaseLink: 'http://pharmacy4.com/buy/Clopidogrel' },
                { medicineId: savedMedicines[12]._id, price: 15, purchaseLink: 'http://pharmacy4.com/buy/Hydrochlorothiazide' },
                { medicineId: savedMedicines[0]._id, price: 13, purchaseLink: 'http://pharmacy4.com/buy/Paracetamol' },
                { medicineId: savedMedicines[1]._id, price: 14, purchaseLink: 'http://pharmacy4.com/buy/Ibuprofen' },
              ],
            },
            {
              name: 'Pharmacy 5',
              address: '104 Main St, City 5',
              medicines: [
                { medicineId: savedMedicines[13]._id, price: 18, purchaseLink: 'http://pharmacy5.com/buy/Losartan' },
                { medicineId: savedMedicines[14]._id, price: 13, purchaseLink: 'http://pharmacy5.com/buy/Citalopram' },
                { medicineId: savedMedicines[2]._id, price: 17, purchaseLink: 'http://pharmacy5.com/buy/Amoxicillin' },
                { medicineId: savedMedicines[3]._id, price: 16, purchaseLink: 'http://pharmacy5.com/buy/Cetirizine' },
                { medicineId: savedMedicines[4]._id, price: 12, purchaseLink: 'http://pharmacy5.com/buy/Metformin' },
              ],
            },
            {
              name: 'Pharmacy 6',
              address: '105 Main St, City 6',
              medicines: [
                { medicineId: savedMedicines[5]._id, price: 12, purchaseLink: 'http://pharmacy6.com/buy/Aspirin' },
                { medicineId: savedMedicines[6]._id, price: 14, purchaseLink: 'http://pharmacy6.com/buy/Lisinopril' },
                { medicineId: savedMedicines[7]._id, price: 13, purchaseLink: 'http://pharmacy6.com/buy/Levothyroxine' },
                { medicineId: savedMedicines[0]._id, price: 14, purchaseLink: 'http://pharmacy6.com/buy/Paracetamol' },
                { medicineId: savedMedicines[1]._id, price: 15, purchaseLink: 'http://pharmacy6.com/buy/Ibuprofen' },
              ],
            },
            {
              name: 'Pharmacy 7',
              address: '106 Main St, City 7',
              medicines: [
                { medicineId: savedMedicines[8]._id, price: 13, purchaseLink: 'http://pharmacy7.com/buy/Atorvastatin' },
                { medicineId: savedMedicines[9]._id, price: 15, purchaseLink: 'http://pharmacy7.com/buy/Omeprazole' },
                { medicineId: savedMedicines[10]._id, price: 16, purchaseLink: 'http://pharmacy7.com/buy/Simvastatin' },
                { medicineId: savedMedicines[3]._id, price: 15, purchaseLink: 'http://pharmacy7.com/buy/Cetirizine' },
                { medicineId: savedMedicines[4]._id, price: 12, purchaseLink: 'http://pharmacy7.com/buy/Metformin' },
              ],
            },
            {
              name: 'Pharmacy 8',
              address: '107 Main St, City 8',
              medicines: [
                { medicineId: savedMedicines[11]._id, price: 14, purchaseLink: 'http://pharmacy8.com/buy/Clopidogrel' },
                { medicineId: savedMedicines[12]._id, price: 18, purchaseLink: 'http://pharmacy8.com/buy/Hydrochlorothiazide' },
                { medicineId: savedMedicines[13]._id, price: 17, purchaseLink: 'http://pharmacy8.com/buy/Losartan' },
                { medicineId: savedMedicines[4]._id, price: 13, purchaseLink: 'http://pharmacy8.com/buy/Metformin' },
                { medicineId: savedMedicines[2]._id, price: 15, purchaseLink: 'http://pharmacy8.com/buy/Amoxicillin' },
              ],
            },
            {
              name: 'Pharmacy 9',
              address: '108 Main St, City 9',
              medicines: [
                { medicineId: savedMedicines[14]._id, price: 16, purchaseLink: 'http://pharmacy9.com/buy/Citalopram' },
                { medicineId: savedMedicines[15]._id, price: 18, purchaseLink: 'http://pharmacy9.com/buy/Sertraline' },
                { medicineId: savedMedicines[0]._id, price: 13, purchaseLink: 'http://pharmacy9.com/buy/Paracetamol' },
                { medicineId: savedMedicines[1]._id, price: 14, purchaseLink: 'http://pharmacy9.com/buy/Ibuprofen' },
                { medicineId: savedMedicines[3]._id, price: 15, purchaseLink: 'http://pharmacy9.com/buy/Cetirizine' },
              ],
            },
            {
                name: 'Pharmacy 10',
                address: '109 Main St, City 10',
                medicines: [
                  { medicineId: savedMedicines[16]._id, price: 20, purchaseLink: 'http://pharmacy10.com/buy/Alprazolam' },
                  { medicineId: savedMedicines[17]._id, price: 22, purchaseLink: 'http://pharmacy10.com/buy/Trazodone' },
                  { medicineId: savedMedicines[0]._id, price: 14, purchaseLink: 'http://pharmacy10.com/buy/Paracetamol' },
                  { medicineId: savedMedicines[1]._id, price: 15, purchaseLink: 'http://pharmacy10.com/buy/Ibuprofen' },
                  { medicineId: savedMedicines[4]._id, price: 17, purchaseLink: 'http://pharmacy10.com/buy/Metformin' },
                ],
              },
              {
                name: 'Pharmacy 11',
                address: '110 Main St, City 11',
                medicines: [
                  { medicineId: savedMedicines[18]._id, price: 12, purchaseLink: 'http://pharmacy11.com/buy/Fluticasone' },
                  { medicineId: savedMedicines[19]._id, price: 18, purchaseLink: 'http://pharmacy11.com/buy/Furosemide' },
                  { medicineId: savedMedicines[3]._id, price: 14, purchaseLink: 'http://pharmacy11.com/buy/Cetirizine' },
                  { medicineId: savedMedicines[2]._id, price: 15, purchaseLink: 'http://pharmacy11.com/buy/Amoxicillin' },
                  { medicineId: savedMedicines[7]._id, price: 16, purchaseLink: 'http://pharmacy11.com/buy/Levothyroxine' },
                ],
              },
              {
                name: 'Pharmacy 12',
                address: '111 Main St, City 12',
                medicines: [
                  { medicineId: savedMedicines[5]._id, price: 15, purchaseLink: 'http://pharmacy12.com/buy/Aspirin' },
                  { medicineId: savedMedicines[6]._id, price: 16, purchaseLink: 'http://pharmacy12.com/buy/Lisinopril' },
                  { medicineId: savedMedicines[1]._id, price: 14, purchaseLink: 'http://pharmacy12.com/buy/Ibuprofen' },
                  { medicineId: savedMedicines[0]._id, price: 13, purchaseLink: 'http://pharmacy12.com/buy/Paracetamol' },
                  { medicineId: savedMedicines[8]._id, price: 18, purchaseLink: 'http://pharmacy12.com/buy/Atorvastatin' },
                ],
              },
              {
                name: 'Pharmacy 13',
                address: '112 Main St, City 13',
                medicines: [
                  { medicineId: savedMedicines[10]._id, price: 20, purchaseLink: 'http://pharmacy13.com/buy/Simvastatin' },
                  { medicineId: savedMedicines[11]._id, price: 21, purchaseLink: 'http://pharmacy13.com/buy/Clopidogrel' },
                  { medicineId: savedMedicines[14]._id, price: 19, purchaseLink: 'http://pharmacy13.com/buy/Citalopram' },
                  { medicineId: savedMedicines[3]._id, price: 15, purchaseLink: 'http://pharmacy13.com/buy/Cetirizine' },
                  { medicineId: savedMedicines[4]._id, price: 17, purchaseLink: 'http://pharmacy13.com/buy/Metformin' },
                ],
              },
              {
                name: 'Pharmacy 14',
                address: '113 Main St, City 14',
                medicines: [
                  { medicineId: savedMedicines[15]._id, price: 22, purchaseLink: 'http://pharmacy14.com/buy/Sertraline' },
                  { medicineId: savedMedicines[16]._id, price: 20, purchaseLink: 'http://pharmacy14.com/buy/Alprazolam' },
                  { medicineId: savedMedicines[2]._id, price: 18, purchaseLink: 'http://pharmacy14.com/buy/Amoxicillin' },
                  { medicineId: savedMedicines[1]._id, price: 16, purchaseLink: 'http://pharmacy14.com/buy/Ibuprofen' },
                  { medicineId: savedMedicines[7]._id, price: 17, purchaseLink: 'http://pharmacy14.com/buy/Levothyroxine' },
                ],
              },
              {
                name: 'Pharmacy 15',
                address: '114 Main St, City 15',
                medicines: [
                  { medicineId: savedMedicines[17]._id, price: 24, purchaseLink: 'http://pharmacy15.com/buy/Trazodone' },
                  { medicineId: savedMedicines[18]._id, price: 23, purchaseLink: 'http://pharmacy15.com/buy/Fluticasone' },
                  { medicineId: savedMedicines[3]._id, price: 15, purchaseLink: 'http://pharmacy15.com/buy/Cetirizine' },
                  { medicineId: savedMedicines[0]._id, price: 16, purchaseLink: 'http://pharmacy15.com/buy/Paracetamol' },
                  { medicineId: savedMedicines[4]._id, price: 17, purchaseLink: 'http://pharmacy15.com/buy/Metformin' },
                ],
              },
        ];
        const savedPharmacies = await Pharmacy.insertMany(pharmacies);
        console.log('addedd pharmacies', savedPharmacies);
        
        const hashedPassword = await bcrypt.hash('userpassword', 10);
        const sampleUser = new User({
            username: 'testuser',
            email: 'testuser@gamil.com',
            password: hashedPassword,
            favorites: [],
        });
        await sampleUser.save();
        console.log('added user', sampleUser);


        const hashedAdminPassword = await bcrypt.hash('adminpassword', 10);
        const adminUser = new User({
            username: 'admin',
            email: 'admin@gmail.com',
            password: hashedAdminPassword,
            favorites: [],
        });

        await adminUser.save();
        console.log('added another user', adminUser);

        process.exit();
    } catch (error) {
        console.error('error', error);
        process.exit(1);
    }
};
seedData();
