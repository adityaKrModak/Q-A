import React from "react";

type props = {
  className: string;
  placeholder: string;
};
const TextArea: React.FC<props> = ({ className, placeholder }) => {
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
    />
  );
};

export default TextArea;
