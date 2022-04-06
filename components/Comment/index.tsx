import Image from "next/image";
import React from "react";
import LikeOutline from "../Common/Icons/likeOutline";

function Comment() {
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
        <div id="comments">Answers please</div>
        <LikeOutline />
      </div>
    </div>
  );
}

export default Comment;
