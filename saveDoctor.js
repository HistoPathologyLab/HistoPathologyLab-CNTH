const fs = require('fs');
const path = require('path');

// Update the path to the OneDrive directory
const doctorDetailsPath = path.join('C:', 'Users', 'USER', 'OneDrive', 'HistoPathology Lab', 'Doctor Details');

function saveDoctor(name, profession) {
    const fileName = `${name.replace(/ /g, '_')}_${profession}.txt`;
    const filePath = path.join(doctorDetailsPath, fileName);
    const content = `Name: ${name}\nProfession: ${profession}`;

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Failed to save doctor data:', err);
            return;
        }
        console.log('Doctor data saved successfully:', { name, profession });
    });
}

module.exports = saveDoctor;
