-- CreateTable
CREATE TABLE "SeleksiInfo" (
    "id" SERIAL NOT NULL,
    "bukaPendaftaran" TIMESTAMP(3) NOT NULL,
    "tutupPendaftaran" TIMESTAMP(3) NOT NULL,
    "pengumuman" TIMESTAMP(3) NOT NULL,
    "alamatSeleksi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SeleksiInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriUjian" (
    "id" SERIAL NOT NULL,
    "seleksiId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "MateriUjian_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MateriUjian" ADD CONSTRAINT "MateriUjian_seleksiId_fkey" FOREIGN KEY ("seleksiId") REFERENCES "SeleksiInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
