/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { QuestionID, Comment } = JSON.parse(req.body);
  console.log(QuestionID);
  addNewComment(QuestionID, Comment, res);
  CommentsIncrement(QuestionID, res);
};

async function addNewComment(QuestionID, Comment, res) {
  try {
    const result = await prisma.Comments.create({
      data: { QuestionID: QuestionID, Comment: Comment },
    });
    console.log(result);
    const finalResult = {
      id: result.CommentID,
      comment: result.Comment,
      likes: result.NoOfLikes,
    };

    res.status(200).json(finalResult);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}
async function CommentsIncrement(QuesID, res) {
  try {
    const result = await prisma.questions.update({
      where: {
        QuestionID: QuesID,
      },
      data: {
        NoOfComments: {
          increment: 1,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}
