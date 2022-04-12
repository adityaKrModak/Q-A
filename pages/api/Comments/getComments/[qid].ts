import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

type Comments = {
  id: string;
  comment: string;
  likes: number;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Comments[]>
) => {
  const { qid } = req.query;
  const questionID = Array.isArray(qid) ? qid[0] : qid;
  const comms = await prisma.comments.findMany({
    where: { QuestionID: questionID },
    orderBy: { created_at: "desc" },
  });
  console.log(comms);
  const comments = comms.map((val) => ({
    id: val.CommentID,
    comment: val.Comment,
    likes: val.NoOfLikes,
  }));
  res.status(200).json(comments);
};
export default handler;
