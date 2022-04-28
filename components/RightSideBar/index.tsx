import React, { useState } from "react";
import AskQuestionModal from "../AskQuestionModal";

const RightSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      id="rightSideBar"
      className="bg-white m-2 mt-7 flex place-content-center rounded-lg"
    >
      <div id="askQuestion" className=" border-slate-100  p-5 ">
        <button
          className="bg-cyan-400 text-white p-4 font-bold max-w-[300px] shadow-md z-10 hover:bg-black"
          onClick={() => setIsModalOpen(true)}
        >
          Ask A Question
        </button>
      </div>
      {isModalOpen && <AskQuestionModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default RightSideBar;
