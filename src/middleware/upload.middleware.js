const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Buat folder uploads/ jika belum ada
const uploadDir = path.join(__dirname, '../../uploads'); // sesuaikan ke root folder proyek

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // recursive biar bisa buat nested folder juga
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
