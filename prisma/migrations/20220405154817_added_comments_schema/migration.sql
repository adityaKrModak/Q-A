-- CreateTable
CREATE TABLE "Comments" (
    "QuestionID" TEXT NOT NULL,
    "CommentID" TEXT NOT NULL,
    "UserId" TEXT NOT NULL DEFAULT E'anonymous',
    "Comment" TEXT NOT NULL,
    "NoOfLikes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("CommentID")
);
