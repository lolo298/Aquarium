/*
  Warnings:

  - The values [PREVIEW] on the enum `FileType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FileType_new" AS ENUM ('MODEL', 'MARKER');
ALTER TABLE "File" ALTER COLUMN "type" TYPE "FileType_new" USING ("type"::text::"FileType_new");
ALTER TYPE "FileType" RENAME TO "FileType_old";
ALTER TYPE "FileType_new" RENAME TO "FileType";
DROP TYPE "FileType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_previewId_fkey";

-- AlterTable
ALTER TABLE "Marker" ADD COLUMN     "fileId" TEXT;
