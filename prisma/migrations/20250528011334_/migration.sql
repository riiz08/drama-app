/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Episode_slug_key" ON "Episode"("slug");
