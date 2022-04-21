import { prisma } from "../../../lib/prisma";

const getLabels = async () => {
  try {
    const result = await prisma.label.findMany();
    console.log(result);
    return result.map((el) => el.LabelName);
  } catch (err) {
    console.error(err);
  }
};
export default getLabels;
