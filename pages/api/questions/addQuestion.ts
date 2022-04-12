import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type Data = {
  id: string;
  question: string;
  likes: number;
  comments: number;
};
type QuestionsType = {
  QuestionID?: string;
  UserId?: string;
  Question: string;
  NoOfLikes?: number;
  NoOfComments?: number;
  created_at?: Date | string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const question = req.body as ExtendedNextApiRequest;

  const result = await prisma.questions.create({
    data: { Question: String(question) },
  });
  console.log(result);
  const finalResult = {
    id: result.QuestionID,
    question: result.Question,
    likes: result.NoOfLikes,
    comments: result.NoOfComments,
  };
  res.status(200).json(finalResult);
};
export default handler;
