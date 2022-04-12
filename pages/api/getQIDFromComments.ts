import { prisma } from "../../lib/prisma";

export const getQIDFromComments = async () => {
  const data = await prisma.comments.findMany({
    distinct: ["QuestionID"],
    select: {
      QuestionID: true,
    },
  });
  console.log(data);

  return data.map((val) => val.QuestionID);
};
