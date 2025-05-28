/*
  Warnings:

  - You are about to drop the column `slug` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Episode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "slug",
DROP COLUMN "title";
