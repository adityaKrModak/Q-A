import React from "react";
import Button from "../Common/Button";
import TextArea from "../Common/Textarea";

export default function AddQuestionComp() {
  return (
    <div className="flex items-center justify-center">
      <div className="m-2">
        <TextArea
          className=" flex md:w-96 h-28 sm:-24 resize-none"
          placeholder="Ask a question..."
        />
        <Button className="px-10 float-right">Ask</Button>
      </div>
    </div>
  );
}
