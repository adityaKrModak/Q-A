import React, { useEffect, useState } from "react";
import AnswerModal from "../AnswerModal";
import QuestionLayout from "../QuestionLayout";

type FeedDataType = {
  id: string;
  question: string;
  likes: number;
  comments: number;
};
type Props = {
  FeedData: FeedDataType[];
  setFeedData(val: FeedDataType[]): void;
};
const QAModalWrapper = ({ FeedData, setFeedData }: Props) => {
  const [isReplyIconEnabled, onReplyClick] = useState<boolean>(false);
  const [modalQuestion, setModalQuestion] = useState<FeedDataType | void>();
  const [updatedPost, setUpdatedPost] = useState<FeedDataType | void>();

  useEffect(() => {
    if (updatedPost) {
      const newData = FeedData.map((element) =>
        element.id == updatedPost.id ? updatedPost : element
      );
      setFeedData(newData);
    }
  }, [updatedPost]);

  const onReplyIconClick = (Feed: FeedDataType) => {
    setModalQuestion(Feed);
    onReplyClick(true);
  };

  return (
    <div>
      {FeedData.map((Feed: FeedDataType) => (
        <QuestionLayout
          key={Feed.id}
          id={Feed.id}
          question={Feed.question}
          likes={Feed.likes}
          comments={Feed.comments}
          onReplyClick={() => onReplyIconClick(Feed)}
        />
      ))}
      <AnswerModal
        isReplyIconEnabled={isReplyIconEnabled}
        onReplyClick={onReplyClick}
        questionDetails={modalQuestion}
        clearQuestionDetails={setModalQuestion}
        setUpdatedPost={setUpdatedPost}
      />
    </div>
  );
};

export default QAModalWrapper;
