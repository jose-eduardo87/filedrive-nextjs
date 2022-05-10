import { FC, useState, memo } from "react";
import Switch from "react-switch";

interface SelectorProps {
  isChecked: boolean;
  icons: {
    checked: JSX.Element;
    unchecked: JSX.Element;
  };
  onChange: () => void;
  onColor?: string;
  offColor?: string;
  width?: number;
  height?: number;
  onHandleColor?: string;
  handleDiameter?: number;
  boxShadow?: string;
  activeBoxShadow?: string;
}

const iconStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontSize: "16",
  paddingRight: 2,
};

const Selector: FC<SelectorProps> = ({
  isChecked,
  icons,
  onChange,
  ...selectorStyles
}) => {
  return (
    <Switch
      onChange={onChange}
      checked={isChecked}
      checkedIcon={<div style={iconStyle}>{icons.checked}</div>}
      uncheckedIcon={<div style={iconStyle}>{icons.unchecked}</div>}
      className="react-switch"
      {...selectorStyles}
    />
  );
};

export default memo(Selector);
