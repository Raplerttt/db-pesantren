const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: Ambil semua data seleksi beserta materi ujian
const getSeleksiInfo = async (req, res) => {
  try {
    const seleksi = await prisma.seleksiInfo.findMany({
      include: { materiUjian: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(seleksi);
  } catch (error) {
    console.error('Error fetching seleksi info:', error);
    res.status(500).json({ message: 'Gagal mengambil data seleksi' });
  }
};

// GET: Ambil satu data seleksi berdasarkan ID
const getSeleksiById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Tambahkan validasi awal
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ message: 'ID tidak valid atau tidak diberikan' });
      }
  
      const seleksi = await prisma.seleksiInfo.findUnique({
        where: { id: parseInt(id, 10) },
        include: { materiUjian: true }
      });
  
      if (!seleksi) {
        return res.status(404).json({ message: 'Data seleksi tidak ditemukan' });
      }
  
      res.status(200).json(seleksi);
    } catch (error) {
      console.error('Error fetching seleksi detail:', error);
      res.status(500).json({ message: 'Gagal mengambil detail seleksi' });
    }
  };
  

// POST: Tambah data seleksi beserta materi ujian
const createSeleksiInfo = async (req, res) => {
  try {
    const {
      bukaPendaftaran,
      tutupPendaftaran,
      pengumuman,
      alamatSeleksi,
      kota,
      materiUjian
    } = req.body;

    const seleksi = await prisma.seleksiInfo.create({
      data: {
        bukaPendaftaran: new Date(bukaPendaftaran),
        tutupPendaftaran: new Date(tutupPendaftaran),
        pengumuman: new Date(pengumuman),
        alamatSeleksi,
        kota,
        materiUjian: {
          create: materiUjian?.map((materi) => ({
            nama: materi.nama,
            deskripsi: materi.deskripsi
          })) || []
        }
      },
      include: { materiUjian: true }
    });

    res.status(201).json(seleksi);
  } catch (error) {
    console.error('Error creating seleksi info:', error);
    res.status(500).json({ message: 'Gagal membuat data seleksi' });
  }
};

// PUT: Update informasi seleksi
const updateSeleksiInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      bukaPendaftaran,
      tutupPendaftaran,
      pengumuman,
      alamatSeleksi,
      kota
    } = req.body;

    const updated = await prisma.seleksiInfo.update({
      where: { id: parseInt(id, 10) },
      data: {
        bukaPendaftaran: new Date(bukaPendaftaran),
        tutupPendaftaran: new Date(tutupPendaftaran),
        pengumuman: new Date(pengumuman),
        alamatSeleksi,
        kota
      }
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating seleksi info:', error);
    res.status(500).json({ message: 'Gagal memperbarui data seleksi' });
  }
};

// DELETE: Hapus seleksi info dan materi ujian terkait
const deleteSeleksiInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // Hapus materi ujian yang terkait terlebih dahulu
    await prisma.materiUjian.deleteMany({
      where: { seleksiId: parseInt(id, 10) }
    });

    // Hapus data utama seleksi
    await prisma.seleksiInfo.delete({
      where: { id: parseInt(id, 10) }
    });

    res.status(200).json({ message: 'Data seleksi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting seleksi info:', error);
    res.status(500).json({ message: 'Gagal menghapus data seleksi' });
  }
};

const getHasilSeleksi = async (req, res) => {
    try {
      const hasil = await prisma.pendaftaranSiswa.findMany({
        include: {
          status: {
            orderBy: { createdAt: 'desc' },
            take: 1, // ambil hanya status terbaru
          }
        }
      });
  
      const mapped = hasil.map((siswa) => ({
        id: siswa.id,
        nama: siswa.namaLengkap,
        nisn: siswa.nisn,
        asalSekolah: siswa.asalSekolah,
        jurusan: siswa.jenjang ?? '-', // fallback jika null
        status: siswa.status[0]?.status ?? 'Belum Diverifikasi'
      }));
  
      res.status(200).json(mapped);
    } catch (error) {
      console.error('Error fetching hasil seleksi:', error);
      res.status(500).json({ message: 'Gagal mengambil hasil seleksi' });
    }
  };

// Export controller untuk digunakan di routes
module.exports = {
  getSeleksiInfo,
  getHasilSeleksi,
  getSeleksiById,
  createSeleksiInfo,
  updateSeleksiInfo,
  deleteSeleksiInfo
};
