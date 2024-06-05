/*
  Warnings:

  - The primary key for the `Book_room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `room_id` on the `Book_room` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room_type_id` to the `Book_room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkout` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book_room" DROP CONSTRAINT "book_room_room";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "room_type";

-- AlterTable
ALTER TABLE "Book_room" DROP CONSTRAINT "Book_room_pkey",
DROP COLUMN "room_id",
ADD COLUMN     "room_type_id" INTEGER NOT NULL,
ADD CONSTRAINT "Book_room_pkey" PRIMARY KEY ("book_id", "room_type_id");

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "checkout" DATE NOT NULL;

-- DropTable
DROP TABLE "Room";

-- AddForeignKey
ALTER TABLE "Book_room" ADD CONSTRAINT "book_room_room" FOREIGN KEY ("room_type_id") REFERENCES "Room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
