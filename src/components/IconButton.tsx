import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type Props = {
  Icon: IconType;
  className?: string;
  link?: string;
  size?: string;
  reduceHoverOpacity?: boolean;
  ping?: boolean;
};

const IconButton: React.FC<Props> = ({
  Icon,
  size = 20,
  reduceHoverOpacity,
  ping,
  className,
  link,
}) => {
  const Classes = `block rounded-full p-3 transition-all hover:hover:bg-blue-700 ${
    reduceHoverOpacity
      ? "hover:bg-opacity-30"
      : "bg-myBlue text-white hover:drop-shadow-lg border-2 border-white"
  } active:scale-90 ${className}`;

  return (
    <span className={ping ? "relative inline-flex" : undefined}>
      {link ? (
        <Link to={link} className={Classes}>
          <Icon size={size} />
        </Link>
      ) : (
        <button className={Classes}>
          <Icon size={size} />
        </button>
      )}

      {ping && (
        <span className="flex absolute h-3 w-3 top-0 right-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-myPink opacity-75 border-gray-800 border-2"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-myPink border-gray-800 border-2"></span>
        </span>
      )}
    </span>
  );
};

export default IconButton;
