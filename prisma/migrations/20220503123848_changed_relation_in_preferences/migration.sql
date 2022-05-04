/*
  Warnings:

  - You are about to drop the column `preferenceId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Preference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Preference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_preferenceId_fkey";

-- DropIndex
DROP INDEX "users_preferenceId_key";

-- AlterTable
ALTER TABLE "Preference" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "preferenceId";

-- CreateIndex
CREATE UNIQUE INDEX "Preference_ownerId_key" ON "Preference"("ownerId");

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
