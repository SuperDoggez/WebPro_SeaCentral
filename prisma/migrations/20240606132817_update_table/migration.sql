/*
  Warnings:

  - Made the column `datetime` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "datetime" SET NOT NULL,
ALTER COLUMN "datetime" SET DATA TYPE TIMESTAMP(6);
