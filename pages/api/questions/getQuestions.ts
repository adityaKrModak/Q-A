import { prisma } from "../../../lib/prisma";

const getQuestions = async () => {
  try {
    const result = await prisma.questions.findMany({
      orderBy: { created_at: "desc" },
      include: {
        Labels: {
          select: {
            LabelName: true,
          },
        },
      },
    });
    console.log(result);
    return result.map((el) => ({
      id: el.QuestionID,
      question: el.Question,
      likes: el.NoOfLikes,
      comments: el.NoOfComments,
      description: el.Description,
      date: el.created_at.toString(),
      labels: el.Labels.map((label) => label.LabelName),
    }));
  } catch (error) {
    console.error(error);
  }
};
export default getQuestions;
