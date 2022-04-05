-- CreateTable
CREATE TABLE "Questions" (
    "QuestionID" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "Question" TEXT NOT NULL,
    "NoOfLikes" INTEGER NOT NULL,
    "NoOfComments" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("QuestionID")
);
