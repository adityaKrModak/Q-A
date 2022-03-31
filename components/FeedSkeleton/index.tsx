import React from "react";
import Image from "next/image";
import LikeOutline from "../Common/Icons/likeOutline";
import Reply from "../Common/Icons/reply";
import Comment from "../Common/Icons/comment";

type FeedData = {
  question: string;
  likes: number;
  comments: number;
};
function FeedSkeleton({ question, likes, comments }: FeedData) {
  return (
    <div className="flex border-solid border-sky-400 border-2  m-2">
      <div id="profilePic" className="m-2">
        <Image
          src="/profile.png"
          alt="it is not loading"
          layout="intrinsic"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col place-content-between m-2">
        <div id="question">{question}</div>
        <div
          id="icons"
          className=" flex place-content-between border-solid border-gray-300 border-t-2"
        >
          <LikeOutline className="m-2" />
          {likes}
          <Reply className="m-2" />
          <Comment className="m-2" />
          {comments}
        </div>
      </div>
    </div>
  );
}

export default FeedSkeleton;