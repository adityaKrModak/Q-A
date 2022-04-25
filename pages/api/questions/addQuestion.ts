import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type Data = {
  id: string;
  question: string;
  likes: number;
  comments: number;
  description: string;
  labels: string[];
};

type RequestBody = {
  question: string;
  description: string;
  labels: string[];
};
interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { question, description, labels } = JSON.parse(req.body) as RequestBody;

  const result = await prisma.questions.create({
    data: {
      Question: question,
      Description: description,
      Labels: {
        connectOrCreate: labels.map((label) => {
          return {
            where: { LabelName: label },
            create: { LabelName: label },
          };
        }),
      },
    },
    include: {
      Labels: {
        select: {
          LabelName: true,
        },
      },
    },
  });
  console.log("Question Detail");
  console.log(result);
  const finalResult = {
    id: result.QuestionID,
    question: result.Question,
    likes: result.NoOfLikes,
    description: result.Description,
    comments: result.NoOfComments,
    labels: result.Labels.map((label) => label.LabelName),
  };
  res.status(200).json(finalResult);
};
export default handler;
