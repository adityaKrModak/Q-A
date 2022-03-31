import React from "react";

type ButtonProps = {
  className: string;
  onClick?: () => void;
};
const Button: React.FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <button
      className={`rounded bg-blue-500 px-4 py-2 my-2 hover:bg-blue-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
