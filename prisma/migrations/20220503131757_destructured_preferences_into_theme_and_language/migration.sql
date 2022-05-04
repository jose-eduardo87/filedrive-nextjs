/*
  Warnings:

  - You are about to drop the `Preference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_ownerId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "language" "Language" DEFAULT E'en',
ADD COLUMN     "theme" "Theme" DEFAULT E'CLEAR';

-- DropTable
DROP TABLE "Preference";
