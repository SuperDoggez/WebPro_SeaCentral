/*
  Warnings:

  - Made the column `name` on table `Package` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "name" SET NOT NULL;
