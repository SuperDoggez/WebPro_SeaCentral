/*
  Warnings:

  - The primary key for the `Book_activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Book_package` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Book_room` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Book_activity" DROP CONSTRAINT "Book_activity_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Book_activity_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Book_package" DROP CONSTRAINT "Book_package_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Book_package_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Book_room" DROP CONSTRAINT "Book_room_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Book_room_pkey" PRIMARY KEY ("id");
