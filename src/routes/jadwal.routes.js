const express = require('express');
const router = express.Router();
const { getAllJadwal, createJadwal } = require('../controllers/jadwal.controllers');

// Route: GET semua jadwal
router.get('/', getAllJadwal);

// Route: POST tambah jadwal
router.post('/', createJadwal);

module.exports = router;
