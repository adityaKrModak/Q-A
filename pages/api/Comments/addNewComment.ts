/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
type Data = {
  QuestionID: string;
  CommentID: string;
  UserId: string;
  Comment: string;
  NoOfLikes: number;
  created_at: Date;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { QuestionID, Comment } = JSON.parse(req.body);
  console.log(QuestionID);
  const response1 = await addNewComment(QuestionID, Comment, res);
  if (response1.ok) {
    const response2 = await CommentsIncrement(QuestionID, res);
    if (response2.ok) {
      console.log(response2);
      const finalResult = {
        id: response2.result.QuestionID,
        question: response2.result.Question,
        likes: response2.result.NoOfLikes,
        comments: response2.result.NoOfComments,
      };
      res.status(200).json(finalResult);
    } else {
      res.status(400).json(response2.err);
    }
  } else {
    res.status(400).json(response1.err);
  }
};

async function addNewComment(QuestionID: string, Comment: string) {
  try {
    const response = await prisma.Comments.create({
      data: { QuestionID: QuestionID, Comment: Comment },
    });
    const finalResult = {
      id: response.CommentID,
      comment: response.Comment,
      likes: response.NoOfLikes,
    };

    return { ok: true, response: finalResult };
  } catch (err) {
    console.log(err);
    return { ok: false, err: err };
  }
}
async function CommentsIncrement(QuesID: string) {
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
    return { ok: true, result: result };
  } catch (err) {
    return { ok: false, err: err };
  }
}
