import React from "react";

interface props {
  className: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function TextArea({
  className,
  placeholder,
  value,
  onChange,
}: props) {
  return (
    <textarea
      className={`
        m-0
        text-base
        font-normal
        text-gray-700
        bg-white
        border border-solid border-gray-300
        rounded
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none 
        ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
