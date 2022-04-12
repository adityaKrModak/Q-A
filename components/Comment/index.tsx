import Image from "next/image";
import React from "react";
import LikeOutline from "../Common/Icons/likeOutline";

interface Props {
  comment: string;
  likes: number;
}

const Comment = ({ comment, likes }: Props) => {
  return (
    <div className="flex border-solid border-black border-2  m-2 ">
      <div id="profilePic" className="m-2">
        <Image
          src="/profile.png"
          alt="it is not loading"
          layout="intrinsic"
          width={50}
          height={50}
        />
      </div>
      <div className="flex flex-col place-content-between m-2  w-96">
        <div id="comments">{comment}</div>
        <LikeOutline /> {likes}
      </div>
    </div>
  );
};

export default Comment;
