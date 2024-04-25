/*
  Warnings:

  - You are about to drop the column `fileId` on the `Marker` table. All the data in the column will be lost.
  - Added the required column `modelId` to the `Marker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_fileId_fkey";

-- AlterTable
ALTER TABLE "Marker" DROP COLUMN "fileId",
ADD COLUMN     "modelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
