import React from "react";
import Image from "next/image";
import LikeOutline from "../Common/Icons/likeOutline";
import Reply from "../Common/Icons/reply";
import CommentIcon from "../Common/Icons/commentIcon";
import Link from "next/link";
import Moment from "moment";
import UpArrow from "../Common/Icons/upArrow";
import DownArrow from "../Common/Icons/downArrow";

interface FeedData {
  id: string;
  imgSrc?: string;
  name?: string;
  question: string;
  likes: number;
  comments: number;
  date: Date;
  onReplyClick?(): void;
}
function QuestionLayout({
  id,
  name,
  question,
  likes,
  comments,
  imgSrc,
  date,
  onReplyClick,
}: FeedData) {
  return (
    <div className="flex border-solid border-gray-50 border  m-3 bg-white max-w-[800px] h-[500px]">
      <div className="m-2 md:m-4 space-y-28 ">
        <div className="border-4 border-cyan-400 rounded-full p-1 max-h-[80px] max-w-[222px] hover:border-black">
          <Image
            id="profilePic"
            src="/profile.png"
            alt="it is not loading"
            width={222}
            height={222}
          />
        </div>

        <div id="likes" className="text-center w-full">
          <UpArrow className=" mx-auto text-gray-500 hover:text-black " />

          <span className="text-gray-500 font-bold text-3xl " id="likes">
            {likes == 0 ? 444 : likes}
          </span>

          <DownArrow className="mx-auto text-gray-500 hover:text-black " />
        </div>
      </div>

      <div className="flex flex-col justify-evenly ">
        <div className="flex ">
          <div
            id="name"
            className="font-semibold text-cyan-400 text-xl hover:text-black mr-4  "
          >
            Anonymous
          </div>
          <span className="mt-1 mr-1 text-gray-400">Asked: </span>
          <div id="date" className="text-cyan-400 mt-0.5">
            {Moment(date).format("MMM Do YY")}
          </div>
        </div>
        <Link href={`/question/${id}`}>
          <a
            id="question"
            className="text-3xl font-semibold hover:text-cyan-400"
          >
            {question}
          </a>
        </Link>

        <p id="desc" className="text-xl text-gray-400">
          In my local language (Bahasa Indonesia) there are no verb-2 or past
          tense form as time tracker. So, I often forget to use the past form of
          verb when speaking english. I saw him last night (correct) I see him
          last night
        </p>
        <div id="labels">
          <span className="  border-2 border-gray-300 p-1 m-2">
            <span className="m-1"> default</span>
          </span>
        </div>
        <div
          id="icons"
          className=" flex place-content-between bg-slate-100  p-4 mr-4"
        >
          <Link href={`/question/${id}`}>
            <a>
              <span className=" flex border-2 border-gray-300 p-1 ">
                <CommentIcon className="m-2" />

                <span className="mt-1 mr-2"> {comments} Answers</span>
              </span>
            </a>
          </Link>
          <button
            className="bg-black text-white font-semibold border p-2 px-4 hover:bg-cyan-400"
            onClick={onReplyClick}
          >
            Answer
          </button>
          {/* <Reply className="m-2" onClick={onReplyClick} />
          <LikeOutline /> */}
          {/* {likes} */}
        </div>
      </div>
    </div>
  );
}

export default QuestionLayout;
