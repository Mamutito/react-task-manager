import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type = "text",
  ...props
}) => {
  return (
    <input
      type={type}
      className={`border-gray-300 bg-transparent px-3 py-1 rounded-full border-2 placeholder-gray-300 flex-1 focus:outline-blue-600${
        className ? " " + className : ""
      }`}
      {...props}
    />
  );
};

export default Input;
