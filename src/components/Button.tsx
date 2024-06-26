import Spinner from "./Spinner";

type Props = {
  text: string;
  secondary?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  text,
  secondary,
  loading,
  className,
  onClick,
}) => {
  return (
    <button
      disabled={loading}
      className={`rounded-full flex items-center gap-3 px-9 py-2 justify-center text-white transition-all hover:drop-shadow-lg ${className} ${
        secondary
          ? "bg-myPink hover:bg-rose-700"
          : "bg-myBlue hover:bg-blue-700"
      } ${loading ? "cursor-wait" : "active:scale-90"}`}
    >
      {loading && <Spinner />}
      {text}
    </button>
  );
};

export default Button;
