import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type reqData = {
  QuestionID: string;
  Comment: Prisma.InputJsonValue;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

const addComment = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { QuestionID, Comment } = JSON.parse(req.body) as reqData;

    const [Comments, Question] = await prisma.$transaction([
      prisma.comments.create({
        data: { QuestionID: QuestionID, Comment: Comment },
      }),
      prisma.questions.update({
        where: {
          QuestionID: QuestionID,
        },
        data: {
          NoOfComments: {
            increment: 1,
          },
        },
        include: {
          Labels: {
            select: {
              LabelName: true,
            },
          },
        },
      }),
    ]);
    const commentDetail = {
      id: Comments.CommentID,
      comment: Comments.Comment,
      likes: Comments.NoOfLikes,
      date: Comments.created_at.toString(),
    };
    const QuestionDetail = {
      id: Question.QuestionID,
      question: Question.Question,
      Description: Question.Description,
      likes: Question.NoOfLikes,
      comments: Question.NoOfComments,
      labels: Question.Labels.map((label) => label.LabelName),
    };
    res.status(200).send([QuestionDetail, commentDetail]);
  } catch (error) {
    console.error(error);
  }
};

export default addComment;
