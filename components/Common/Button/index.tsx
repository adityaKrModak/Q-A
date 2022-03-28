import React from "react";

type ButtonProps = {
  className: string;
};
const Button: React.FC<ButtonProps> = ({ className, children }) => {
  return (
    <button
      className={`rounded bg-blue-500 px-4 py-2 my-2 hover:bg-blue-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
