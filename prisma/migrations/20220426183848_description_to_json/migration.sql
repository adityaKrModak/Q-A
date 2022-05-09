/*
  Warnings:

  - Changed the type of `Description` on the `Questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "Description",
ADD COLUMN     "Description" JSONB NOT NULL;
