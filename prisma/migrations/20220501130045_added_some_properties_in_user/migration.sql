/*
  Warnings:

  - You are about to drop the column `optionId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('CLEAR', 'DARK');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_optionId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "optionId",
ADD COLUMN     "preferenceId" TEXT;

-- DropTable
DROP TABLE "Option";

-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL,
    "theme" "Theme" DEFAULT E'CLEAR',
    "language" "Language",

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "Preference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
