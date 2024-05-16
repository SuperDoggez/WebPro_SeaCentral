/*
  Warnings:

  - Added the required column `service_time` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "service_time" TEXT NOT NULL;
