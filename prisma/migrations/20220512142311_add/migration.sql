/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Comment` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `CommentID` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `NoOfLikes` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `QuestionID` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `UserName` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Comments` table. All the data in the column will be lost.
  - The primary key for the `Label` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `LabelID` on the `Label` table. All the data in the column will be lost.
  - You are about to drop the column `LabelName` on the `Label` table. All the data in the column will be lost.
  - The primary key for the `Questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Description` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `NoOfComments` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `NoOfLikes` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `Question` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `QuestionID` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Questions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[labelName]` on the table `Label` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - The required column `commentID` was added to the `Comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `questionID` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelName` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - The required column `questionID` was added to the `Questions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_LabelToQuestions" DROP CONSTRAINT "_LabelToQuestions_A_fkey";

-- DropForeignKey
ALTER TABLE "_LabelToQuestions" DROP CONSTRAINT "_LabelToQuestions_B_fkey";

-- DropIndex
DROP INDEX "Label_LabelName_key";

-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
DROP COLUMN "Comment",
DROP COLUMN "CommentID",
DROP COLUMN "NoOfLikes",
DROP COLUMN "QuestionID",
DROP COLUMN "UserId",
DROP COLUMN "UserName",
DROP COLUMN "created_at",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "comment" JSONB NOT NULL,
ADD COLUMN     "commentID" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "noOfLikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "questionID" TEXT NOT NULL,
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("commentID");

-- AlterTable
ALTER TABLE "Label" DROP CONSTRAINT "Label_pkey",
DROP COLUMN "LabelID",
DROP COLUMN "LabelName",
ADD COLUMN     "labelID" SERIAL NOT NULL,
ADD COLUMN     "labelName" TEXT NOT NULL,
ADD CONSTRAINT "Label_pkey" PRIMARY KEY ("labelID");

-- AlterTable
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_pkey",
DROP COLUMN "Description",
DROP COLUMN "NoOfComments",
DROP COLUMN "NoOfLikes",
DROP COLUMN "Question",
DROP COLUMN "QuestionID",
DROP COLUMN "UserId",
DROP COLUMN "created_at",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" JSONB NOT NULL,
ADD COLUMN     "noOfComments" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "noOfLikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "questionID" TEXT NOT NULL,
ADD CONSTRAINT "Questions_pkey" PRIMARY KEY ("questionID");

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionPostId" TEXT,
    "commentPostId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Label_labelName_key" ON "Label"("labelName");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Questions"("questionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_questionPostId_fkey" FOREIGN KEY ("questionPostId") REFERENCES "Questions"("questionID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentPostId_fkey" FOREIGN KEY ("commentPostId") REFERENCES "Comments"("commentID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabelToQuestions" ADD FOREIGN KEY ("A") REFERENCES "Label"("labelID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabelToQuestions" ADD FOREIGN KEY ("B") REFERENCES "Questions"("questionID") ON DELETE CASCADE ON UPDATE CASCADE;
