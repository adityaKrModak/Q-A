import { prisma } from "../../../lib/prisma";

export const getQuestionDetails = async (id: string) => {
  const questionDetails = await prisma.questions.findUnique({
    where: {
      QuestionID: id,
    },
  });
  if (questionDetails === null) {
    return {};
  } else {
    return {
      id: questionDetails.QuestionID,
      question: questionDetails.Question,
      likes: questionDetails.NoOfLikes,
      comments: questionDetails.NoOfComments,
    };
  }
};
