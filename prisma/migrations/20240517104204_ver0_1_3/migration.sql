/*
  Warnings:

  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Book_activity" DROP CONSTRAINT "book_activity_book";

-- DropForeignKey
ALTER TABLE "Book_package" DROP CONSTRAINT "book_package_book";

-- DropForeignKey
ALTER TABLE "Book_room" DROP CONSTRAINT "book_room_book";

-- AlterTable
ALTER TABLE "Book_activity" ALTER COLUMN "book_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Book_package" ALTER COLUMN "book_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Book_room" ALTER COLUMN "book_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Book_activity" ADD CONSTRAINT "book_activity_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_room" ADD CONSTRAINT "book_room_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_package" ADD CONSTRAINT "book_package_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
