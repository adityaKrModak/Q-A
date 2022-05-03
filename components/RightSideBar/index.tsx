import React, { useContext, useState } from "react";
import AskQuestionModal from "../AskQuestionModal";
import { AppContext } from "../../state/context";
import { ActionType } from "../../state/action";
import { FeedDataType } from "../../state/state";

interface FormData {
  title: string;
  description: string;
  labels: string[];
}

const RightSideBar = () => {
  const { state, dispatch } = useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveFormData = async ({ title, description, labels }: FormData) => {
    const response = await fetch(`/api/questions/addQuestion`, {
      method: "POST",
      body: JSON.stringify({
        question: title,
        description: description,
        labels: labels,
      }),
    });
    if (response.ok) {
      const question = (await response.json()) as FeedDataType;
      dispatch({ type: ActionType.AddQuestion, payload: question });
      const newTags: string[] = [];
      labels.forEach((tag) => !state.Labels.includes(tag) && newTags.push(tag));
      if (newTags.length > 0) {
        dispatch({ type: ActionType.UpdateLabels, payload: newTags });
      }

      setIsModalOpen(false);
    }
  };

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
      {isModalOpen && (
        <AskQuestionModal
          setIsModalOpen={setIsModalOpen}
          saveFormData={saveFormData}
        />
      )}
    </div>
  );
};

export default RightSideBar;
