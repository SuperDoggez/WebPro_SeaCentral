/*
  Warnings:

  - You are about to alter the column `book_id` on the `Book_activity` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `book_id` on the `Book_package` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `book_id` on the `Book_room` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Book_activity" DROP CONSTRAINT "book_activity_book";

-- DropForeignKey
ALTER TABLE "Book_package" DROP CONSTRAINT "book_package_book";

-- DropForeignKey
ALTER TABLE "Book_room" DROP CONSTRAINT "book_room_book";

-- AlterTable
ALTER TABLE "Book_activity" ALTER COLUMN "book_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Book_package" ALTER COLUMN "book_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Book_room" ALTER COLUMN "book_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Book_activity" ADD CONSTRAINT "book_activity_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_room" ADD CONSTRAINT "book_room_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_package" ADD CONSTRAINT "book_package_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
