const express = require('express');
const router = express.Router();
const seleksiController = require('../controllers/seleksi.controllers');

router.get('/', seleksiController.getSeleksiInfo);
router.get('/hasil-seleksi', seleksiController.getHasilSeleksi);
router.get('/:id', seleksiController.getSeleksiById);
router.post('/', seleksiController.createSeleksiInfo);
router.put('/:id', seleksiController.updateSeleksiInfo);
router.delete('/:id', seleksiController.deleteSeleksiInfo);

module.exports = router;
