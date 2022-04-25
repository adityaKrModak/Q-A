import { DeltaOperation } from "quill";
import { prisma } from "../../../../lib/prisma";

export const getComments = async (id: string) => {
  const comments = await prisma.comments.findMany({
    where: { QuestionID: id },
    orderBy: { created_at: "desc" },
  });
  return comments.map((val) => ({
    id: val.CommentID,
    comment: val.Comment as DeltaOperation,
    likes: val.NoOfLikes,
  }));
};
