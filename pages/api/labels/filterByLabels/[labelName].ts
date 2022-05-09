import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

const filterByLabel = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { labelName } = req.query;
    console.log(req.query);
    const result = await prisma.label.findMany({
      where: {
        LabelName: Array.isArray(labelName) ? labelName[0] : labelName,
      },
      include: {
        Questions: {
          include: {
            Labels: {
              select: {
                LabelName: true,
              },
            },
          },
        },
      },
    });
    const filteredData = result[0].Questions.map((el) => ({
      id: el.QuestionID,
      question: el.Question,
      description: el.Description,
      likes: el.NoOfLikes,
      comments: el.NoOfComments,
      labels: el.Labels.map((label) => label.LabelName),
    }));

    res.status(200).send(filteredData);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};
export default filterByLabel;
