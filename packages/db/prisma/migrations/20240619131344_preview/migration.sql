/*
  Warnings:

  - You are about to drop the column `fileId` on the `Marker` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "FileType" ADD VALUE 'PREVIEW';

-- AlterTable
ALTER TABLE "Marker" DROP COLUMN "fileId",
ADD COLUMN     "previewId" TEXT;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_previewId_fkey" FOREIGN KEY ("previewId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
