/*
  Warnings:

  - You are about to alter the column `size` on the `File` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "size" SET DATA TYPE INTEGER;
