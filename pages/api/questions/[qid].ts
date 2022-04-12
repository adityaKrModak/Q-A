import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type Data = {
  id: string;
  question: string;
  likes: number;
  comments: number;
};
type error = {
  err: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | error>
) => {
  const { qid } = req.query;
  const questionID = Array.isArray(qid) ? qid[0] : qid;
  const questionDetails = await prisma.questions.findUnique({
    where: {
      QuestionID: questionID,
    },
  });
  if (questionDetails === null) {
    res.status(404).json({ err: "Data not found" });
  } else {
    const feed = {
      id: questionDetails.QuestionID,
      question: questionDetails.Question,
      likes: questionDetails.NoOfLikes,
      comments: questionDetails.NoOfComments,
    };
    console.log(feed);
    res.status(200).json(feed);
  }
};
export default handler;
