import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
type Data = {
  QuestionID: string;
  CommentID: string;
  UserId: string;
  Comment: string;
  NoOfLikes: number;
  created_at: Date;
};
type FeedDataType = {
  id: string;
  question: string;
  likes: number;
  comments: number;
};
type reqData = {
  QuestionID: string;
  Comment: string;
};
interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { QuestionID, Comment } = JSON.parse(req.body) as reqData;

  const response1 = await addNewComment(QuestionID, Comment);
  if (response1.ok) {
    const response2 = await CommentsIncrement(QuestionID);
    if (response2.ok) {
      console.log(response2);
      const finalResult: FeedDataType = {
        id: response2.result.QuestionID,
        question: response2.result.Question,
        likes: response2.result.NoOfLikes,
        comments: response2.result.NoOfComments,
      };
      res.status(200).json(finalResult);
    }
  }
};

async function addNewComment(QuestionID: string, Comment: string) {
  const response = await prisma.comments.create({
    data: { QuestionID: QuestionID, Comment: Comment },
  });
  const finalResult = {
    id: response.CommentID,
    comment: response.Comment,
    likes: response.NoOfLikes,
  };

  return { ok: true, response: finalResult };
}
async function CommentsIncrement(QuesID: string) {
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
}

export default handler;
