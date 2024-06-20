/*
  Warnings:

  - Made the column `previewId` on table `Marker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Marker" ALTER COLUMN "previewId" SET NOT NULL;
