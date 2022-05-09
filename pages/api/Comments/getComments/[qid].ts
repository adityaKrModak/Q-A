import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

const getComments = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { qid } = req.query;
    const questionID = Array.isArray(qid) ? qid[0] : qid;
    const result = await prisma.comments.findMany({
      where: { QuestionID: questionID },
      orderBy: { created_at: "desc" },
    });
    console.log(result);
    const comments = result.map((val) => ({
      id: val.CommentID,
      comment: val.Comment as Prisma.InputJsonValue,
      likes: val.NoOfLikes,
      date: val.created_at.toString(),
    }));
    res.status(200).send(comments);
  } catch (error) {
    console.error(error);
  }
};
export default getComments;
