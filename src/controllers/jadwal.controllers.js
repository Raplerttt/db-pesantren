const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ambil semua jadwal kegiatan
const getAllJadwal = async (req, res) => {
  try {
    const kegiatan = await prisma.jadwalKegiatan.findMany({
      orderBy: { date: 'asc' }
    });
    res.json(kegiatan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil jadwal' });
  }
};

// Tambah jadwal kegiatan baru
const createJadwal = async (req, res) => {
  try {
    const { title, date, time, location } = req.body;
    const kegiatanBaru = await prisma.jadwalKegiatan.create({
      data: {
        title,
        date: new Date(date),
        time,
        location
      }
    });
    res.status(201).json(kegiatanBaru);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menambahkan jadwal' });
  }
};

module.exports = {
  getAllJadwal,
  createJadwal
};
