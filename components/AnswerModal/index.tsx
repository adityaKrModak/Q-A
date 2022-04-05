import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import AddQuestionComp from "../AddQuestionComp";

type props = {
  replyIconClicked: boolean;
  onReplyClick(val: boolean): void;
  questionDetails?: FeedDataType;
  clearQuestionDetails?(val: FeedDataType): void;
};
type FeedDataType = {
  id: string;
  question: string;
  likes: number;
  comments: number;
};

const AnswerModal = ({
  replyIconClicked,
  onReplyClick,
  clearQuestionDetails,
  questionDetails,
}: props) => {
  const [answer, addAnswer] = useState<string>("");

  const onClick = async () => {
    if (answer.length >= 3) {
      console.log("checking");
      const result = await fetch("/api/Comments/addNewComment", {
        method: "POST",
        body: JSON.stringify({
          QuestionID: questionDetails.id,
          Comment: answer,
        }),
      });
      if (result.ok) {
        onClose();
      }
    }
  };

  const onClose = () => {
    onReplyClick(false);
    clearQuestionDetails();
  };
  return (
    <>
      {replyIconClicked && (
        <div
          id="modal"
          className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4"
        >
          <div className="relative top-40 mx-auto shadow-lg rounded-md bg-white max-w-md">
            <div className="flex justify-between items-center bg-green-500 text-white text-xl rounded-t-md px-4 py-2">
              <h3>Answer</h3>
              <button onClick={onClose}>x</button>
            </div>
            <div className="flex">
              <div id="profilePic" className="m-2">
                <Image
                  src="/profile.png"
                  alt="it is not loading"
                  layout="intrinsic"
                  width={100}
                  height={100}
                />
              </div>
              <div id="question">{questionDetails.question}</div>
            </div>

            <AddQuestionComp
              onClick={onClick}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                addAnswer(e.target.value)
              }
            >
              Answer
            </AddQuestionComp>
            <div className="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnswerModal;
