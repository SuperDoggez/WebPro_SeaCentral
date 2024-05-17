/*
  Warnings:

  - Added the required column `status` to the `Book_activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Book_package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Book_room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book_activity" ADD COLUMN     "status" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "Book_package" ADD COLUMN     "status" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "Book_room" ADD COLUMN     "status" VARCHAR(10) NOT NULL;
