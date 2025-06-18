-- CreateEnum
CREATE TYPE "Jenjang" AS ENUM ('MTS', 'SMA');

-- AlterTable
ALTER TABLE "PendaftaranSiswa" ADD COLUMN     "jenjang" "Jenjang";
