import React from "react";
import Image from "next/image";
import CommentIcon from "../Common/Icons/commentIcon";
import Link from "next/link";
import UpArrow from "../Common/Icons/upArrow";
import DownArrow from "../Common/Icons/downArrow";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FeedDataType } from "../../state/state";
import moment from "moment";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  Feed: FeedDataType;
  answerPage?: boolean;
};
function QuestionLayout({ Feed, answerPage = false }: Props) {
  return (
    <div className="flex border-solid border-gray-200 border  mt-7 bg-white max-w-[1000px] max-h-max ">
      <div className="m-2 md:m-4 flex flex-col">
        <div className="border-4 border-cyan-400 rounded-full pt-1 px-1 hover:border-black mb-2">
          <Image
            id="profilePic"
            src="/profile.png"
            alt="it is not loading"
            width={50}
            height={50}
          />
        </div>

        <div
          id="likes"
          className="text-center w-full h-max grid place-content-center flex-1  "
        >
          <UpArrow className=" mx-auto text-gray-500 hover:text-black " />

          <span className="text-gray-500 font-bold text-xl " id="likes">
            {Feed.likes == 0 ? 444 : Feed.likes}
          </span>

          <DownArrow className="mx-auto text-gray-500 hover:text-black " />
        </div>
      </div>

      <div className="flex flex-col justify-evenly w-full ml-2">
        <div className="flex ">
          <div
            id="name"
            className="font-semibold text-cyan-400 text-md hover:text-black mr-4 "
          >
            Anonymous
          </div>
          <span className="mt-1 mr-1 text-gray-400 text-xs">Asked: </span>
          <div id="date" className="text-cyan-400 mt-1 text-xs">
            {moment(Feed.date).format("MMM Do YY")}
          </div>
        </div>
        <Link href={`/question/${Feed.id}`}>
          <a
            id="question"
            className="text-2xl font-semibold hover:text-cyan-400"
          >
            {Feed.question}
          </a>
        </Link>

        <div id="desc" className=" text-gray-400 text-xl my-4 -ml-4">
          {/* {Feed.description} */}
          <ReactQuill
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            value={Feed.description}
            readOnly={true}
            theme={"bubble"}
            style={{ fontSize: "120px" }}
            modules={{ toolbar: false }}
          />
        </div>
        <div id="labels" className="my-4 ">
          {Feed.labels.map((label) => (
            <span key={label} className="  border-2 border-gray-300 p-1 mr-2">
              <span className="p-1"> {label}</span>
            </span>
          ))}
        </div>

        <div
          id="icons"
          className=" flex place-content-between bg-slate-100  p-3 mr-10 my-4 "
        >
          <Link href={`/question/${Feed.id}`}>
            <a>
              <span className=" flex border-2 border-gray-300 p-1 ">
                <CommentIcon className="m-2" />

                <span className="mt-1 mr-2 text-md">
                  {" "}
                  {Feed.comments} Answers
                </span>
              </span>
            </a>
          </Link>
          {!answerPage && (
            <Link href={`/question/${Feed.id}`}>
              <a className="bg-black text-white font-semibold border p-2 px-4 text-md hover:bg-cyan-400">
                Answer
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionLayout;
