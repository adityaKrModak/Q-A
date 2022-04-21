import React, { useReducer, useState } from "react";
import Comment from "../../components/Comment";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getQuestionDetails } from "../api/questions/getQuestionDetails";
import { getComments } from "../api/Comments/getComments/getComments";
import { getQIDFromComments } from "../api/getQIDFromComments";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Delta from "quill";
import QuestionLayout from "../../components/QuestionLayout";
import { FeedDataType } from "../../state/state";
import getLabels from "../api/labels/getLabels";
import { feedReducer } from "../../state/reducer";
import { AppContext } from "../../state/context";
import { ActionType } from "../../state/action";
import Editor from "../../components/Editor";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
};

type Comments = {
  id: string;
  comment: Delta;
  likes: number;
};
type Props = {
  question: FeedDataType;
  comments: Comments[];
  labels: string[];
};
export const FeedDetails = ({ question, comments, labels }: Props) => {
  const [state, dispatch] = useReducer(feedReducer, {
    FeedData: [question],
    Labels: labels,
  });
  const [commentDetail, updateComments] = useState(comments);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout>
        <div className="bg-white max-w-[1000px]  mx-2">
          <QuestionLayout Feed={state.FeedData[0]} answerPage={true} />
          <div className="">
            <Editor updateComments={updateComments} />
          </div>
        </div>
        <div className="mb-3">
          {commentDetail.map((element) => (
            <Comment
              key={element.id}
              comment={element.comment}
              likes={element.likes}
            />
          ))}
        </div>
      </Layout>
    </AppContext.Provider>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getQIDFromComments();

  const paths = ids.map((val) => ({ params: { id: val } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};
interface IParams extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const question = (await getQuestionDetails(id)) as FeedDataType;
  const comments = await getComments(question.id);
  const labels = await getLabels();

  return { props: { question, comments, labels } };
};

export default FeedDetails;
