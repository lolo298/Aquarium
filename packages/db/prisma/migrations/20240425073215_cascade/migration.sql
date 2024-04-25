-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_markerId_fkey";

-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_modelId_fkey";

-- DropForeignKey
ALTER TABLE "Marker" DROP CONSTRAINT "Marker_previewId_fkey";

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_markerId_fkey" FOREIGN KEY ("markerId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Marker" ADD CONSTRAINT "Marker_previewId_fkey" FOREIGN KEY ("previewId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
