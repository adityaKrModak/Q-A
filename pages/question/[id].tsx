import React, { useReducer, useState } from "react";
import Comment from "../../components/Comment";
import Layout from "../../components/Layout";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getQuestionDetails } from "../api/questions/getQuestionDetails";
import { getComments } from "../api/Comments/getComments/getComments";
import { getQIDFromComments } from "../api/getQIDFromComments";
import QuestionLayout from "../../components/QuestionLayout";
import { CommentType, FeedDataType } from "../../state/state";
import getLabels from "../api/labels/getLabels";
import { feedReducer } from "../../state/reducer";
import { AppContext } from "../../state/context";
import Editor from "../../components/Editor";
import { ActionType } from "../../state/action";

type Props = {
  question: FeedDataType;
  comments: CommentType[];
  labels: string[];
};
const FeedDetails = ({ question, comments, labels }: Props) => {
  const [state, dispatch] = useReducer(feedReducer, {
    FeedData: [question],
    Labels: labels,
  });
  const [QuestionDetail, updateQuestionDetail] = useState(question);
  const [commentDetail, updateComments] = useState(comments);
  const [QuillValue, setQuillValue] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onAnswerClick = () => {
    void (async function () {
      if (textContent.length >= 5) {
        setIsLoading(true);
        console.log("checking");
        const result = await fetch("/api/Comments/addComment", {
          method: "POST",
          body: JSON.stringify({
            QuestionID: state.FeedData[0].id,
            Comment: QuillValue,
          }),
        });
        if (result.ok) {
          const [Question, CommentData] = (await result.json()) as [
            Question: FeedDataType,
            CommentData: CommentType
          ];
          console.log(Question);
          const data = commentDetail;
          data.unshift(CommentData);
          updateComments(data);
          setTextContent("");
          setQuillValue("");
          updateQuestionDetail((prevData) => {
            return { ...prevData, comments: prevData.comments + 1 };
          });
          // dispatch({ type: ActionType.FilterQuestions, payload: [Question] });
          setIsLoading(false);
        }
      }
    })();
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout>
        <div className="bg-white max-w-[1000px]  mx-2">
          <QuestionLayout Feed={QuestionDetail} answerPage={true} />
          <div className="">
            <div id="quillRoot" className=" mx-1 my-3 flex flex-col ">
              <Editor
                QuillValue={QuillValue}
                setTextContent={setTextContent}
                setQuillValue={setQuillValue}
              />
            </div>
            <div
              role="button"
              className="bg-cyan-400 flex-1 font-semibold p-3 mx-5 my-5 text-white text-center hover:bg-black "
              onClick={onAnswerClick}
            >
              {isLoading ? "Loading..." : "Leave An Answer"}
            </div>
          </div>
        </div>
        <div className="mb-20">
          {commentDetail.map((element) => (
            <Comment
              key={element.id}
              id={element.id}
              comment={element.comment}
              likes={element.likes}
              date={element.date}
            />
          ))}
        </div>
      </Layout>
    </AppContext.Provider>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const ids = await getQIDFromComments();
//   if (ids == null) {
//     throw new Error("No Id's Present");
//   }
//   const paths = ids.map((val) => ({ params: { id: val } }));
//   return {
//     paths: paths,
//     fallback: true,
//   };
// };
interface IParams extends ParsedUrlQuery {
  id: string;
}
// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params as IParams;
//   const question = (await getQuestionDetails(id)) as FeedDataType;
//   const comments = await getComments(question.id);
//   const labels = await getLabels();
//   console.log(comments);

//   return { props: { question, comments, labels } };
// };
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams;
  const question = (await getQuestionDetails(id)) as FeedDataType;
  const comments = await getComments(question.id);
  const labels = await getLabels();

  return { props: { question, comments, labels } };
};

export default FeedDetails;
