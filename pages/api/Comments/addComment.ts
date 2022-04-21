import type { NextApiRequest, NextApiResponse } from "next";
import { DeltaOperation } from "quill";
import { prisma } from "../../../lib/prisma";

type reqData = {
  QuestionID: string;
  Comment: DeltaOperation;
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
      const finalResult = {
        id: response2.result.QuestionID,
        question: response2.result.Question,
        Description: response2.result.Description,
        likes: response2.result.NoOfLikes,
        comments: response2.result.NoOfComments,
        labels: response2.result.Labels.map((label) => label.LabelName),
      };
      res.status(200).json(finalResult);
    }
  }
};

async function addNewComment(QuestionID: string, Comment: DeltaOperation) {
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
    include: {
      Labels: {
        select: {
          LabelName: true,
        },
      },
    },
  });
  return { ok: true, result: result };
}

export default handler;
