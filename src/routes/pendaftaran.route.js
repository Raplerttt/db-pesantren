// src/routes/pendaftaran.routes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const controller = require('../controllers/pendaftaran.controllers');

router.post(
  '/pendaftaran',
  upload.fields([
    { name: 'fileKartuKeluarga', maxCount: 1 },
    { name: 'fileIjazah', maxCount: 1 },
    { name: 'filePasFoto', maxCount: 1 },
  ]),
  controller.createPendaftaran
);

router.get('/pendaftaran/cek-nisn', controller.cekNISN);

module.exports = router;
