/*
  Warnings:

  - Added the required column `country` to the `Tourist_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tourist_info" ADD COLUMN     "country" TEXT NOT NULL;
