/*
  Warnings:

  - The primary key for the `budgets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `username` on the `budgets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_pkey",
DROP COLUMN "username",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "budgets_pkey" PRIMARY KEY ("id");
