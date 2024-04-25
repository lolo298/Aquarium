/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `previewId` to the `Marker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "FileType" ADD VALUE 'PREVIEW';

-- AlterTable
ALTER TABLE "Marker" ADD COLUMN     "previewId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_path_key" ON "File"("path");

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_previewId_fkey" FOREIGN KEY ("previewId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
