import { prisma } from "../../../lib/prisma";

export const getQuestionDetails = async (id: string) => {
  const questionDetails = await prisma.questions.findUnique({
    where: {
      QuestionID: id,
    },
    include: {
      Labels: {
        select: {
          LabelName: true,
        },
      },
    },
  });
  if (questionDetails === null) {
    return {};
  } else {
    return {
      id: questionDetails.QuestionID,
      question: questionDetails.Question,
      description: questionDetails.Description,
      likes: questionDetails.NoOfLikes,
      comments: questionDetails.NoOfComments,
      labels: questionDetails.Labels.map((label) => label.LabelName),
    };
  }
};
