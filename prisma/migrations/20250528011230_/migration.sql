/*
  Warnings:

  - Added the required column `slug` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "slug" TEXT NOT NULL;
