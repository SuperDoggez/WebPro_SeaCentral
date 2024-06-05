/*
  Warnings:

  - Added the required column `adult` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `children` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "adult" TEXT NOT NULL,
ADD COLUMN     "children" TEXT NOT NULL;
