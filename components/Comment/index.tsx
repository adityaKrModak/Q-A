import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import UpArrow from "../Common/Icons/upArrow";
import DownArrow from "../Common/Icons/downArrow";
import { CommentType } from "../../state/state";
import moment from "moment";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Comment = ({ comment, likes, date }: CommentType) => {
  return (
    <>
      <div className="flex border-solid border-gray-50 border  mx-3 mt-7 mb-2 bg-white max-w-[1000px] max-h-max">
        <div className="border-2 border-cyan-400 rounded-full pt-1 px-1 hover:border-black mx-4 my-4 h-max w-max">
          <Image
            id="profilePic"
            src="/profile.png"
            alt="it is not loading"
            width={50}
            height={50}
          />
        </div>

        <div className="flex flex-col justify-evenly w-full ml-2">
          <div
            id="name"
            className="font-semibold text-cyan-400 text-md hover:text-black mt-4 "
          >
            Anonymous
          </div>
          <span className="mt-1 mr-1 text-gray-400 text-xs">
            Added an answer on{" "}
            <span id="date" className="text-cyan-400 mt-1 text-xs">
              {moment(date).format("MMM Do YY")}
            </span>
          </span>

          <div id="desc" className="-ml-3 -mb-8">
            <ReactQuill
              theme="bubble"
              readOnly={true}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              value={comment}
            />
          </div>
          <div id="likeAndShare" className="flex mb-2">
            <UpArrow className="  text-gray-500 hover:text-black mt-1 mr-2 " />

            <span className="text-gray-500 font-bold text-lg mr-2 " id="likes">
              {likes == 0 ? 444 : likes}
            </span>

            <DownArrow className=" text-gray-500 hover:text-black mt-1 mr-2" />
            <span className=" border-r border-slate-300"></span>
            <span className="mx-2">Share</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
