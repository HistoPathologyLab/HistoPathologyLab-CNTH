const fs = require('fs');
const path = require('path');

// Update the path to the OneDrive directory
const doctorDetailsPath = path.join('C:', 'Users', 'USER', 'OneDrive', 'HistoPathology Lab', 'Doctor Details');

function removeDoctor(name, profession) {
    const fileName = `${name.replace(/ /g, '_')}_${profession}.txt`;
    const filePath = path.join(doctorDetailsPath, fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to remove doctor data:', err);
            return;
        }
        console.log('Doctor data removed successfully:', { name, profession });
    });
}

module.exports = removeDoctor;
