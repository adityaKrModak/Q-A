import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type RequestBody = {
  question: string;
  description: Prisma.InputJsonValue;
  labels: string[];
};
interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

const addQuestion = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { question, description, labels } = JSON.parse(
      req.body
    ) as RequestBody;

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
    const QuestionDetail = {
      id: result.QuestionID,
      question: result.Question,
      likes: result.NoOfLikes,
      description: result.Description,
      comments: result.NoOfComments,
      labels: result.Labels.map((label) => label.LabelName),
    };
    res.status(200).json(QuestionDetail);
  } catch (error) {
    console.error(error);
  }
};
export default addQuestion;
