import { prisma } from "../../../lib/prisma";

const getQuestions = async () => {
  const result = await prisma.questions.findMany({
    orderBy: { created_at: "desc" },
  });
  console.log(result);
  return result.map((el) => {
    return {
      id: el.QuestionID,
      question: el.Question,
      likes: el.NoOfLikes,
      comments: el.NoOfComments,
    };
  });
};
export default getQuestions;
