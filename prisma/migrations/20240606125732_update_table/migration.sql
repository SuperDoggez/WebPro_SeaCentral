/*
  Warnings:

  - You are about to drop the column `service_time` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `end` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "service_time",
ADD COLUMN     "end" VARCHAR(5) NOT NULL,
ADD COLUMN     "start" VARCHAR(5) NOT NULL;
