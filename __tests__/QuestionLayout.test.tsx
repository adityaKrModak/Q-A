import Feed from "../pages/question/index";
import { render, screen } from "@testing-library/react";
import { FeedDataType } from "../state/state";
import QuestionLayout from "../components/QuestionLayout";
import { execOnce } from "next/dist/shared/lib/utils";
import moment from "moment";

const dummyFeedData: FeedDataType = {
  id: "4d7aadd4-3c30-4eb3-a055-cb0d3c6b385a",
  question: "What are some good Movies?",
  likes: 0,
  comments: 10,
  description: {
    ops: [
      {
        insert: "Good Movies in every ",
      },
      {
        insert: "genre",
        attributes: {
          bold: true,
        },
      },
      {
        insert: "\n",
      },
    ],
  },
  date: new Date("2022-04-27 00:10:52"),
  labels: ["testing1", "testing2"],
};

describe("Question Layout", () => {
  test("renders expected design", () => {
    render(<QuestionLayout Feed={dummyFeedData} />);
    expect(
      screen.getByRole("link", { name: dummyFeedData.question })
    ).toHaveAttribute("href", `/question/${dummyFeedData.id}`);

    expect(screen.getByRole("link", { name: "Answer" })).toHaveAttribute(
      "href",
      `/question/${dummyFeedData.id}`
    );

    expect(
      screen.getByRole("link", { name: `${dummyFeedData.comments} Answers` })
    ).toHaveAttribute("href", `/question/${dummyFeedData.id}`);

    dummyFeedData.labels.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    expect(
      screen.getByText(moment(dummyFeedData.date).format("MMM Do YY"))
    ).toBeInTheDocument();

    // expect(screen.getByText("Good Movies in every")).toBeInTheDocument();     Check how to test React Quill
  });
});
