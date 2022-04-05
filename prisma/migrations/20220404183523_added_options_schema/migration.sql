-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'ptBR');

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_ownerId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "optionId" TEXT;

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "isDark" BOOLEAN DEFAULT false,
    "language" "Language",

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
