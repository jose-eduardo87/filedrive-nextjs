import { FC, useState } from "react";
import Switch from "react-switch";

interface SelectorProps {
  icons: {
    checked: JSX.Element | string;
    unchecked: JSX.Element | string;
  };
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

const Selector: FC<SelectorProps> = ({ icons, ...selectorStyles }) => {
  const [checked, setChecked] = useState(false);

  const changeHandler = () => {
    setChecked((currentState) => !currentState);

    // SEND REQUEST TO SAVE CURRENT OPTION
  };

  return (
    <Switch
      onChange={changeHandler}
      checked={checked}
      checkedIcon={<div style={{ ...iconStyle }}>{icons.checked}</div>}
      uncheckedIcon={<div style={{ ...iconStyle }}>{icons.unchecked}</div>}
      className="react-switch"
      {...selectorStyles}
    />
  );
};

export default Selector;
