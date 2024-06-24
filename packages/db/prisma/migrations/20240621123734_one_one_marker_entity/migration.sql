/*
  Warnings:

  - You are about to drop the column `markerId` on the `Entity` table. All the data in the column will be lost.
  - You are about to drop the column `names` on the `Entity` table. All the data in the column will be lost.
  - The `food` column on the `Entity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `OtherName` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[MarkerId]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `MarkerId` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zone` to the `Entity` table without a default value. This is not possible if the table is not empty.
  - Made the column `long` on table `Entity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_markerId_fkey";

-- DropForeignKey
ALTER TABLE "OtherName" DROP CONSTRAINT "OtherName_entityId_fkey";

-- AlterTable
ALTER TABLE "Entity" DROP COLUMN "markerId",
DROP COLUMN "names",
ADD COLUMN     "MarkerId" TEXT NOT NULL,
ADD COLUMN     "zone" TEXT NOT NULL,
ALTER COLUMN "long" SET NOT NULL,
DROP COLUMN "food",
ADD COLUMN     "food" TEXT[];

-- DropTable
DROP TABLE "OtherName";

-- CreateTable
CREATE TABLE "Names" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Names_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entity_MarkerId_key" ON "Entity"("MarkerId");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_MarkerId_fkey" FOREIGN KEY ("MarkerId") REFERENCES "Marker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Names" ADD CONSTRAINT "Names_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
