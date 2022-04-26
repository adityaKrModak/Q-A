import { prisma } from "../../lib/prisma";

export const getQIDFromComments = async () => {
  try {
    const data = await prisma.comments.findMany({
      distinct: ["QuestionID"],
      select: {
        QuestionID: true,
      },
    });
    console.log(data);

    return data.map((val) => val.QuestionID);
  } catch (error) {
    console.error(error);
  }
};
