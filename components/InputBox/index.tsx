import React, { ReactNode } from "react";
import Button from "../Common/Button";
import TextArea from "../Common/Textarea";

interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => Promise<void> | void;
  children?: ReactNode;
}

export default function InputBox({
  onChange,
  value,
  onClick,
  children,
}: Props) {
  return (
    <div className="flex items-center justify-center">
      <div className="m-2">
        <TextArea
          className=" flex w-96 h-28 resize-none"
          placeholder="Minimum three characters.."
          onChange={onChange}
          value={value}
        />
        <Button className="px-10 float-right" onClick={onClick}>
          {children ? children : "Ask"}
        </Button>
      </div>
    </div>
  );
}
