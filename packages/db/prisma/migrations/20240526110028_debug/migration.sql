/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "number" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");
