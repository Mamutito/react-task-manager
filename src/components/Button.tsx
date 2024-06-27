import React from "react";
import Spinner from "./Spinner";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  secondary?: boolean;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  secondary,
  loading,
  className,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className={`rounded-full flex items-center gap-3 px-9 py-2 justify-center text-white transition-all hover:drop-shadow-lg ${className} ${
        secondary
          ? "bg-myPink hover:bg-rose-700"
          : "bg-myBlue hover:bg-blue-700"
      } ${loading ? "cursor-wait" : "active:scale-90"}`}
      {...props}
    >
      {loading && <Spinner />}
      {text}
    </button>
  );
};

export default Button;
