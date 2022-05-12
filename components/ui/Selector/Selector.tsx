import { FC, memo } from "react";
import { useRouter } from "next/router";
import Switch from "react-switch";
import { useTheme } from "store/theme-context";
import { ICONS_STYLES_SETTINGS_OPTIONS } from "helpers/constants";

interface SelectorProps {
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

const Selector: FC<SelectorProps> = ({ onChange, ...selectorStyles }) => {
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const { isDark } = useTheme();

  const icons = {
    checked: (
      <p style={ICONS_STYLES_SETTINGS_OPTIONS}>
        {isEnglish ? "LIGHT" : "CLARO"}
      </p>
    ),
    unchecked: (
      <p style={ICONS_STYLES_SETTINGS_OPTIONS}>
        {isEnglish ? "DARK" : "ESCURO"}
      </p>
    ),
  };

  return (
    <Switch
      onChange={onChange}
      checked={!isDark}
      checkedIcon={<div style={iconStyle}>{icons.checked}</div>}
      uncheckedIcon={<div style={iconStyle}>{icons.unchecked}</div>}
      className="react-switch"
      {...selectorStyles}
    />
  );
};

export default memo(Selector);
