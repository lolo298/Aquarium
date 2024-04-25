/*
  Warnings:

  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('MODEL', 'MARKER');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "type" "FileType" NOT NULL;
