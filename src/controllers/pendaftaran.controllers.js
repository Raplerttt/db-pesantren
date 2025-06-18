const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPendaftaran = async (req, res) => {
  try {
    const {
      namaLengkap, nisn, tempatLahir, tanggalLahir, alamat,
      namaAyah, namaIbu, pekerjaanAyah, jenjang, pekerjaanIbu, noTeleponOrtu,
      asalSekolah, alamatSekolah, nilaiUN
    } = req.body;

    // Validasi NISN tidak duplikat
    const existing = await prisma.pendaftaranSiswa.findUnique({
      where: { nisn },
    });

    if (existing) {
      return res.status(400).json({ message: 'NISN sudah terdaftar' });
    }

    // Validasi file
    if (!req.files || !req.files.fileKartuKeluarga || !req.files.fileIjazah || !req.files.filePasFoto) {
      return res.status(400).json({ message: 'Semua file wajib diunggah' });
    }

    const data = await prisma.pendaftaranSiswa.create({
      data: {
        namaLengkap,
        nisn,
        tempatLahir,
        tanggalLahir: new Date(tanggalLahir),
        alamat,
        namaAyah,
        namaIbu,
        pekerjaanAyah,
        pekerjaanIbu,
        jenjang,
        noTeleponOrtu,
        asalSekolah,
        alamatSekolah,
        nilaiUN: nilaiUN ? parseFloat(nilaiUN) : null,
        fileKartuKeluarga: req.files.fileKartuKeluarga[0].path,
        fileIjazah: req.files.fileIjazah[0].path,
        filePasFoto: req.files.filePasFoto[0].path,
      },
    });

    res.status(201).json({ message: 'Pendaftaran berhasil', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menyimpan data', error: error.message });
  }
};

exports.cekNISN = async (req, res) => {
    try {
      const { nisn } = req.query;
  
      if (!nisn) {
        return res.status(400).json({ message: 'NISN wajib diisi' });
      }
  
      const existing = await prisma.pendaftaranSiswa.findUnique({
        where: { nisn }
      });
  
      return res.status(200).json({ exists: !!existing });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Gagal mengecek NISN' });
    }
  };
  
