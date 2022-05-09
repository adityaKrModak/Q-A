import { render, screen } from "@testing-library/react";
import { FeedDataType } from "../state/state";
import moment from "moment";
import Comment from "../components/Comment";

const dummyCommentData = {
  id: "4d7aadd4-3c30-4eb3-a055-cb0d3c6b385a",
  likes: 0,
  comment: {
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
};

describe("Comments", () => {
  test("renders expected design", () => {
    render(
      <Comment
        id={dummyCommentData.id}
        comment={dummyCommentData.comment}
        likes={dummyCommentData.likes}
        date={dummyCommentData.date}
      />
    );
    expect(
      screen.getByText(moment(dummyCommentData.date).format("MMM Do YY"))
    ).toBeInTheDocument();

    // expect(screen.getByText("Good Movies in every")).toBeInTheDocument();     Check how to test React Quill
  });
});
