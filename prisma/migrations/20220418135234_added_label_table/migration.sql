/*
  Warnings:

  - You are about to drop the column `Comment` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `UserName` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "Comment",
ADD COLUMN     "UserName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Label" (
    "LabelID" SERIAL NOT NULL,
    "LabelName" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("LabelID")
);

-- CreateTable
CREATE TABLE "_LabelToQuestions" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_LabelName_key" ON "Label"("LabelName");

-- CreateIndex
CREATE UNIQUE INDEX "_LabelToQuestions_AB_unique" ON "_LabelToQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_LabelToQuestions_B_index" ON "_LabelToQuestions"("B");

-- AddForeignKey
ALTER TABLE "_LabelToQuestions" ADD FOREIGN KEY ("A") REFERENCES "Label"("LabelID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabelToQuestions" ADD FOREIGN KEY ("B") REFERENCES "Questions"("QuestionID") ON DELETE CASCADE ON UPDATE CASCADE;
