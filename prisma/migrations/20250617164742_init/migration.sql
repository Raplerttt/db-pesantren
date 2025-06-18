/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "PendaftaranSiswa" (
    "id" SERIAL NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "namaAyah" TEXT NOT NULL,
    "namaIbu" TEXT NOT NULL,
    "pekerjaanAyah" TEXT NOT NULL,
    "pekerjaanIbu" TEXT NOT NULL,
    "noTeleponOrtu" TEXT NOT NULL,
    "asalSekolah" TEXT NOT NULL,
    "alamatSekolah" TEXT NOT NULL,
    "nilaiUN" DOUBLE PRECISION,
    "fileKartuKeluarga" TEXT NOT NULL,
    "fileIjazah" TEXT NOT NULL,
    "filePasFoto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PendaftaranSiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendaftaranSiswaStatus" (
    "id" SERIAL NOT NULL,
    "pendaftaranSiswaId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PendaftaranSiswaStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PendaftaranSiswa" ADD CONSTRAINT "PendaftaranSiswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendaftaranSiswaStatus" ADD CONSTRAINT "PendaftaranSiswaStatus_pendaftaranSiswaId_fkey" FOREIGN KEY ("pendaftaranSiswaId") REFERENCES "PendaftaranSiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
