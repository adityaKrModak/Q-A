import React, { useState } from "react";
import AskQuestionModal from "../AskQuestionModal";

const RightSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div id="rightSideBar" className="bg-white m-2 invisible md:visible mt-7 ">
      <div id="askQuestion" className=" border-slate-100 border-b-4 p-5 ">
        <button
          className="bg-cyan-400 text-white p-4 font-bold lg:w-[300px]"
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
