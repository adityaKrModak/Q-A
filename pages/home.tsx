import type { GetServerSideProps } from "next";
import InputBox from "../components/InputBox";
import Layout from "../components/Layout";
import { useState } from "react";
import getQuestions from "./api/questions/getQuestions";
import QAModalWrapper from "../components/QAModalWrapper";

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

  const onAskBtnClick = async () => {
    if (askQuestion.length >= 3) {
      const data: FeedDataType[] = FeedData;
      const result = await fetch("/api/questions/addQuestion", {
        method: "POST",
        body: askQuestion,
      });
      const updatedData = (await result.json()) as FeedDataType;
      data.unshift(updatedData);
      setAskQuestionValue("");
      setFeedData(data);
    }
  };

  return (
    <Layout>
      <InputBox
        value={askQuestion}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
          setAskQuestionValue(e.target.value)
        }
        onClick={onAskBtnClick}
      />
      <QAModalWrapper FeedData={FeedData} setFeedData={setFeedData} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await getQuestions();
  return { props: { feed } };
};

export default Home;
