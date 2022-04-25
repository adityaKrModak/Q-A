/*
  Warnings:

  - Changed the type of `Comment` on the `Comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "Comment",
ADD COLUMN     "Comment" JSONB NOT NULL;
