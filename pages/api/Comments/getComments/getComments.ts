import { prisma } from "../../../../lib/prisma";

export const getComments = async (id: string) => {
  try {
    const comments = await prisma.comments.findMany({
      where: { QuestionID: id },
      orderBy: { created_at: "desc" },
    });
    console.log(comments);
    return comments.map((val) => ({
      id: val.CommentID,
      comment: val.Comment,
      likes: val.NoOfLikes,
      date: val.created_at.toString(),
    }));
  } catch (error) {
    console.error(error);
  }
};
