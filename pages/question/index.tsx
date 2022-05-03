import type { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { useReducer } from "react";
import getQuestions from "../api/questions/getQuestions";
import QuestionLayout from "../../components/QuestionLayout";
import { feedReducer } from "../../state/reducer";
import { FeedDataType } from "../../state/state";
import { AppContext } from "../../state/context";
import getLabels from "../api/labels/getLabels";

type Props = {
  feed: FeedDataType[];
  labels: string[];
};

const Feed = ({ feed, labels }: Props) => {
  const [state, dispatch] = useReducer(feedReducer, {
    FeedData: feed,
    Labels: labels,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout>
        {state.FeedData.map((Feed: FeedDataType) => (
          <QuestionLayout key={Feed.id} Feed={Feed} />
        ))}
      </Layout>
    </AppContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await getQuestions();
  const labels = await getLabels();

  return { props: { feed, labels } };
};

export default Feed;
