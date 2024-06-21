require('dotenv').config();
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('TENANT_ID:', process.env.TENANT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
console.log('REDIRECT_URI:', process.env.REDIRECT_URI);
console.log('ONE_DRIVE_FOLDER_PATH:', process.env.ONE_DRIVE_FOLDER_PATH);

const express = require('express');
const cors = require('cors');
const app = express();
const saveDoctorToOneDrive = require('./api/saveDoctor');
const removeDoctorFromOneDrive = require('./api/removeDoctor');

// CORS settings
app.use(cors({
    origin: ['https://histo-pathology-lab-cnth.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.post('/api/doctors', async (req, res) => {
    try {
        const doctor = req.body;
        console.log('Received doctor data:', doctor);
        const response = await saveDoctorToOneDrive(doctor);
        res.status(200).json({ message: 'Doctor data saved successfully', response });
    } catch (error) {
        console.error('Failed to save doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data', error: error.message });
    }
});

app.delete('/api/doctors', async (req, res) => {
    try {
        const doctor = req.body;
        const fileName = `${process.env.ONE_DRIVE_FOLDER_PATH}/${doctor.name}_${doctor.profession}.json`;
        await removeDoctorFromOneDrive(fileName);
        res.status(200).json({ message: 'Doctor data removed successfully' });
    } catch (error) {
        console.error('Failed to remove doctor data:', error);
        res.status(500).json({ message: 'Failed to remove doctor data', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});