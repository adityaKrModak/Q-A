import React, { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { AppContext } from "../../state/context";
import { ActionType } from "../../state/action";
import { FeedDataType } from "../../state/state";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  },
};
type Comments = {
  id: string;
  comment: Delta;
  likes: number;
};
type Props = {
  updateComments(val: Comments[]): void;
};

const Editor = ({ updateComments }: Props) => {
  const { state, dispatch } = useContext(AppContext);

  const [reactQuillValue, setReactQuillValue] = useState<string>("");
  const [textContent, setTextContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onButtonClick = () => {
    setIsLoading(true);
    void (async function () {
      if (textContent.length >= 5) {
        console.log("checking");
        const result = await fetch("/api/Comments/addComment", {
          method: "POST",
          body: JSON.stringify({
            QuestionID: state.FeedData[0].id,
            Comment: reactQuillValue,
          }),
        });
        if (result.ok) {
          const question = (await result.json()) as FeedDataType;
          dispatch({ type: ActionType.FilterQuestions, payload: [question] });
          setReactQuillValue("");
          setTextContent("");
        }
      }

      const resp = await fetch(
        `/api/Comments/getComments/${state.FeedData[0].id}`
      );
      const newComments = (await resp.json()) as Comments[];
      updateComments(newComments);
      setIsLoading(false);
    })();
  };
  return (
    <div id="quillRoot" className=" mx-1 my-3 flex flex-col ">
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Add Your Answer Here..."
        value={reactQuillValue}
        onChange={(value) => setReactQuillValue(value)}
        onBlur={(r, s, editor) => {
          setTextContent(editor.getText());
          setReactQuillValue(editor.getContents());
        }}
      />

      <div
        role="button"
        className="bg-cyan-400 flex-1 font-semibold p-3 mx-5 my-5 text-white text-center hover:bg-black "
        onClick={onButtonClick}
      >
        {isLoading ? "Loading..." : "Leave An Answer"}
      </div>
    </div>
  );
};

export default Editor;
