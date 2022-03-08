import { CSSProperties, ReactNode, useState } from "react";

interface ButtonProps {
  children: string | ReactNode;
  title?: string;
  isDisabled?: boolean;
  style?: CSSProperties;
}

const buttonStyle = (
  hoverState: boolean,
  isDisabled?: boolean,
  style?: CSSProperties
): CSSProperties => {
  return {
    minWidth: "100px",
    minHeight: "60px",
    fontWeight: 600,
    textDecoration: "none",
    textAlign: "center",
    cursor: isDisabled ? "not-allowed" : "pointer",
    outline: "none",
    fontSize: "inherit",
    padding: ".35em 1.2em",
    transition: ".5s all",
    backgroundColor: hoverState ? "#FFFFFF" : "#00564D",
    color: hoverState ? "#000000" : "#FFFFFF",
    border: hoverState ? "none" : "1px solid #FFFFFF",
    ...style,
  };
};

const Button = ({ children, title, isDisabled, style }: ButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const hoverButtonHandler = (type?: "enter") =>
    type === "enter" ? setIsHovering(true) : setIsHovering(false);

  return (
    <button
      onMouseEnter={() => hoverButtonHandler("enter")}
      onMouseLeave={() => hoverButtonHandler()}
      style={buttonStyle(isHovering, isDisabled, style)}
      title={title}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
