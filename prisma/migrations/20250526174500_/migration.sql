/*
  Warnings:

  - You are about to drop the column `episodeNumber` on the `Episode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `episodeNum` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Episode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "episodeNumber",
ADD COLUMN     "episodeNum" INTEGER NOT NULL,
ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Episode_slug_key" ON "Episode"("slug");
