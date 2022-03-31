import React from "react";
import Button from "../Common/Button";
import TextArea from "../Common/Textarea";

interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
}

export default function AddQuestionComp({ onChange, value, onClick }: Props) {
  return (
    <div className="flex items-center justify-center">
      <div className="m-2">
        <TextArea
          className=" flex md:w-96 h-28 sm:-24 resize-none"
          placeholder="Minimum three characters.."
          onChange={onChange}
          value={value}
        />
        <Button className="px-10 float-right" onClick={onClick}>
          Ask
        </Button>
      </div>
    </div>
  );
}
