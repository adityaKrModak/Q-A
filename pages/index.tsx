import type { GetServerSideProps } from "next";
import AddQuestionComp from "../components/AddQuestionComp";
import Layout from "../components/Layout";
import FeedSkeleton from "../components/FeedSkeleton";
import { useState } from "react";

type FeedDataType = {
  id: number;
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

  const onClick = () => {
    if (askQuestion.length >= 3) {
      const data: FeedDataType[] = FeedData;
      data.unshift({
        id: Math.random(),
        question: `${askQuestion}`,
        likes: 0,
        comments: 0,
      });
      setAskQuestionValue("");
      setFeedData(data);
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
        />
      ))}
    </Layout>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async () => {
  const randomNumber = Math.floor(Math.random() * 20 + 1);

  const feed: FeedDataType[] = [];
  for (let i = 0; i < randomNumber; i++) {
    feed.push({
      id: i,
      question: `What is Projectile?${i}`,
      likes: i,
      comments: i,
    });
  }
  console.log(feed);
  return { props: { feed } };
};

export default Home;
