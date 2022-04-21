import React, { useContext, useState } from "react";
import CloseIcon from "../Common/Icons/closeIcon";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { FeedDataType } from "../../state/state";
import { AppContext } from "../../state/context";
import { ActionType } from "../../state/action";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
type Props = {
  setIsModalOpen(val: boolean): void;
};
const AskQuestionModal = ({ setIsModalOpen }: Props) => {
  const { dispatch } = useContext(AppContext);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onButtonClick = () => {
    console.log("clicked");
    setIsLoading(true);
    void (async function () {
      if (title.length >= 3 && description.length >= 10 && labels.length >= 1) {
        const messageBody = {
          question: title,
          description: description,
          labels: labels,
        };
        const resp = await fetch("/api/questions/addQuestion", {
          method: "POST",
          body: JSON.stringify(messageBody),
        });

        const newQuestion = (await resp.json()) as FeedDataType;
        dispatch({ type: ActionType.AddQuestion, payload: newQuestion });
        setIsModalOpen(false);
        setIsLoading(false);
      }
    })();
  };
  return (
    <div
      id="modal"
      className="  fixed z-50 inset-0 bg-gray-900 bg-opacity-60 h-full w-full overflow-y-auto "
    >
      <div className="relative top-5 mx-auto shadow-lg rounded-md bg-white max-w-3xl ">
        <div className="w-full border-b-2 mb-4 border-slate-300">
          <button
            className="m-2 hover:bg-gray-200 rounded-full p-2"
            onClick={() => setIsModalOpen(false)}
          >
            <CloseIcon className="text-5xl" />
          </button>
        </div>
        <div className="flex flex-col">
          <label
            className="font-semibold text-3xl ml-6 text-gray-500 "
            id="title"
          >
            Title
          </label>
          <input
            className="w-2/3 border-2 h-[60px] m-6 border-gray-300 rounded-lg placeholder:text-xl placeholder: pl-4 shadow-lg"
            placeholder="Add a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            className="font-semibold text-3xl ml-6 text-gray-500 "
            id="desc"
          >
            Description
          </label>
          <div className="">
            <textarea
              className="w-2/3 border-2 max-h-max min-h-[60px] m-6 border-gray-300 rounded-lg placeholder:text-xl placeholder: pl-4 placeholder: shadow-lg "
              placeholder="Add a Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            {/* <ReactQuill
              value={description}
              onChange={(value) => {
                setDescription(value);
                console.log(value);
              }}
              theme="snow"
              className="w-full shadow-xl rounded-lg min-h-fit"
              modules={modules}
            /> */}
          </div>
          <label
            className="font-semibold text-3xl ml-6 text-gray-500 "
            id="tags"
          >
            Labels
          </label>
          <input
            className="w-2/3 border-2 h-[60px] m-6 border-gray-300 rounded-lg placeholder:text-xl placeholder: pl-4 shadow-lg"
            placeholder="Add at least one tag"
            value={labels}
            onChange={(e) => {
              if (e.target.value === "" || e.target.value === " ") {
                setLabels([]);
              } else {
                const labelValues = e.target.value.trim().split(",");
                setLabels(labelValues.map((label) => label));
              }
            }}
          />
        </div>

        <div className="m-4 flex">
          {labels.map((el, index) => (
            <div
              className="border-2 border-slate-300 rounded-md p-2 mr-2"
              key={index}
            >
              {el}
            </div>
          ))}
        </div>

        <div className="w-full border-t-2 mb-4 border-slate-300 flex flex-row-reverse ">
          <button
            className="rounded-lg px-4 py-2 m-2 text-white bg-cyan-400"
            onClick={onButtonClick}
          >
            {isLoading ? "Loading..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionModal;
