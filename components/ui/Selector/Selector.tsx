import { FC, useState } from "react";
import Switch from "react-switch";

interface SelectorProps {
  icons: {
    checked: JSX.Element;
    unchecked: JSX.Element;
  };
}

const Selector: FC<SelectorProps> = ({ icons }) => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked((currentState) => !currentState);

    // SEND REQUEST TO SAVE CURRENT OPTION
  };

  return (
    <Switch
      onChange={changeHandler}
      checked={checked}
      checkedIcon={icons.checked}
      uncheckedIcon={icons.unchecked}
      className="react-switch"
    />
  );
};

export default Selector;
