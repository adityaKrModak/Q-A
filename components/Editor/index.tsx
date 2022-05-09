import React from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

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

type Props = {
  QuillValue: string;
  setQuillValue(val: string): void;
  setTextContent(val: string): void;
};

const Editor = ({ QuillValue, setQuillValue, setTextContent }: Props) => {
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      placeholder="Add Your Answer Here..."
      value={QuillValue}
      onChange={(value) => setQuillValue(value)}
      onBlur={(r, s, editor) => {
        setTextContent(editor.getText());
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setQuillValue(editor.getContents());
      }}
    />
  );
};

export default Editor;
