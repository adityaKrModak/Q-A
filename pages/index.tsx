import type { GetServerSideProps } from "next";
import AddQuestionComp from "../components/AddQuestionComp";
import Layout from "../components/Layout";
import FeedSkeleton from "../components/FeedSkeleton";
import { useEffect, useState } from "react";
import { prisma } from "../lib/prisma";
import QuestionDetails from "./question/[id]";
import AnswerModal from "../components/AnswerModal";

type FeedDataType = {
  id: string;
  question: string;
  likes: number;
  comments: number;
};
type Props = {
  feed: FeedDataType[];
};

const Home = ({ feed }: Props) => {
  const [FeedData, setFeedData] = useState<FeedDataType[]>(feed);
  const [askQuestion, setAskQuestionValue] = useState<string>("");
  const [replyIconClicked, onReplyClick] = useState<boolean>(false);
  const [replyIconFeedData, onReplyIconClickFeedData] =
    useState<FeedDataType | void>();
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
    onReplyIconClickFeedData(Feed);
    onReplyClick(true);
  };
  const onClick = () => {
    if (askQuestion.length >= 3) {
      const data: FeedDataType[] = FeedData;
      const result = fetch("/api/questions/addNewQuestion", {
        method: "POST",
        body: askQuestion,
      })
        .then((result) => (result.ok ? result.json() : false))
        .then((res: FeedDataType) => {
          data.unshift(res);
          setAskQuestionValue("");
          setFeedData(data);
        });
    }
  };

  return (
    <Layout>
      <AddQuestionComp
        value={askQuestion}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
          setAskQuestionValue(e.target.value)
        }
        onClick={onClick}
      />
      {FeedData.map((Feed: FeedDataType) => (
        <FeedSkeleton
          key={Feed.id}
          question={Feed.question}
          likes={Feed.likes}
          comments={Feed.comments}
          onReplyClick={() => onReplyIconClick(Feed)}
        />
      ))}
      <AnswerModal
        replyIconClicked={replyIconClicked}
        onReplyClick={onReplyClick}
        questionDetails={replyIconFeedData}
        clearQuestionDetails={onReplyIconClickFeedData}
        setUpdatedPost={setUpdatedPost}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let feed: FeedDataType[] = [];
  const result = await prisma.questions.findMany({
    orderBy: { created_at: "desc" },
  });
  console.log(result);
  feed = result.map((result) => {
    return {
      id: result.QuestionID,
      question: result.Question,
      likes: result.NoOfLikes,
      comments: result.NoOfComments,
    };
  });

  console.log(feed);
  return { props: { feed } };
};

export default Home;
