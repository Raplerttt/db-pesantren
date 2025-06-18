/*
  Warnings:

  - A unique constraint covering the columns `[nisn]` on the table `PendaftaranSiswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `PendaftaranSiswa` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PendaftaranSiswa" DROP CONSTRAINT "PendaftaranSiswa_userId_fkey";

-- AlterTable
ALTER TABLE "PendaftaranSiswa" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PendaftaranSiswa_nisn_key" ON "PendaftaranSiswa"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "PendaftaranSiswa_userId_key" ON "PendaftaranSiswa"("userId");

-- AddForeignKey
ALTER TABLE "PendaftaranSiswa" ADD CONSTRAINT "PendaftaranSiswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
