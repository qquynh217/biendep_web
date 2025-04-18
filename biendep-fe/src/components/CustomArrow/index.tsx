import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface CustomArrowProps {
  type?: "prev" | "next";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomArrow: React.FC<CustomArrowProps> = ({
  type,
  className,
  onClick,
}) => {
  const isNext = type === "next";

  return (
    <div className={className + " banner-arrow"} onClick={onClick}>
      {isNext ? <FaAngleRight /> : <FaAngleLeft />}
    </div>
  );
};

export default CustomArrow;
