import React, { useEffect, useState } from "react";
import Comment from "../../components/Comment";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getQuestionDetails } from "../api/questions/getQuestionDetails";
import { getComments } from "../api/Comments/getComments/getComments";
import { getQIDFromComments } from "../api/getQIDFromComments";
import QAModalWrapper from "../../components/QAModalWrapper";

type FeedDataType = {
  id: string;
  question: string;
  likes: number;
  comments: number;
  date: Date;
};
type Comments = {
  id: string;
  comment: string;
  likes: number;
};
type Props = {
  question: FeedDataType;
  comments: Comments[];
};
const FeedDetails = ({ question, comments }: Props) => {
  const [questionDetail, updateQuestionDetails] = useState([question]);
  const [commentDetail, updateComments] = useState(comments);

  useEffect(() => {
    console.log("Inside QuestionDetails");
    void (async function () {
      console.log("inside async call");
      const resp = await fetch(`/api/Comments/getComments/${question.id}`);
      const newComments = (await resp.json()) as Comments[];
      updateComments(newComments);
    })();
  }, [questionDetail]);

  const router = useRouter();
  return router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <Layout>
      <QAModalWrapper
        FeedData={questionDetail}
        setFeedData={updateQuestionDetails}
      />
      {commentDetail.map((element) => (
        <Comment
          key={element.id}
          comment={element.comment}
          likes={element.likes}
        />
      ))}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getQIDFromComments();

  const paths = ids.map((val) => ({ params: { id: val } }));
  return {
    paths: paths,
    fallback: true,
  };
};
interface IParams extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const question = (await getQuestionDetails(id)) as FeedDataType;
  const comments = await getComments(question.id);
  console.log(comments);

  return { props: { question, comments } };
};

export default FeedDetails;
