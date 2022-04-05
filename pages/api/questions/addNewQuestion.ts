/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {
  id: string;
  question: string;
  likes: number;
  comments: number;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = req.body as { data: string };
  try {
    const result = await prisma.questions.create({
      data: { Question: data },
    });
    console.log(result);
    const finalResult = {
      id: result.QuestionID,
      question: result.Question,
      likes: result.NoOfLikes,
      comments: result.NoOfComments,
    };
    res.status(200).json(finalResult);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};
