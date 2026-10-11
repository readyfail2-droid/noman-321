const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Hamza\\.gemini\\antigravity-ide\\brain\\12868ba1-94c3-4761-b1c1-dbea09854255';
const targetDir = 'C:\\Users\\Hamza\\.gemini\\antigravity-ide\\scratch\\dr-sadaf-hospital';
const assetsDir = path.join(targetDir, 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

try {
  fs.copyFileSync(
    path.join(srcDir, 'doctor_portrait_1791727001931.jpg'),
    path.join(assetsDir, 'dr-sadaf-sarwar.jpg')
  );
  fs.copyFileSync(
    path.join(srcDir, 'doctor_portrait_1791727001931.jpg'),
    path.join(targetDir, 'dr-sadaf-sarwar.jpg')
  );
  fs.copyFileSync(
    path.join(srcDir, 'clinic_interior_1791727043821.jpg'),
    path.join(assetsDir, 'hospital-interior.jpg')
  );
  fs.copyFileSync(
    path.join(srcDir, 'clinic_interior_1791727043821.jpg'),
    path.join(targetDir, 'hospital-interior.jpg')
  );
  console.log('Successfully copied assets!');
} catch (err) {
  console.error('Error copying assets:', err);
}
