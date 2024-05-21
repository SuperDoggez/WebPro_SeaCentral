/*
  Warnings:

  - Added the required column `datetime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "datetime" TIMESTAMPTZ(6) NOT NULL;
