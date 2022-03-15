import { CSSProperties } from "react";

export const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
};

export const focusedStyle: CSSProperties = {
  borderColor: "#2196f3",
};

export const acceptStyle: CSSProperties = {
  borderColor: "#00e676",
};

export const rejectStyle: CSSProperties = {
  borderColor: "#ff1744",
};

export const MALE_PROFILE_PIC = "/static/public/images/profile-male.webp";

export const FEMALE_PROFILE_PIC = "/static/public/images/profile-female.webp";

export const HEADING_STYLE_IN_DASHBOARD = {
  fontWeight: 100,
  marginBottom: "3rem",
  color: "#2093C3",
};

export const HEADING_STYLE_IN_FILES: CSSProperties = {
  color: "#7E7E7E",
  fontSize: "1.2rem",
  fontWeight: 400,
  letterSpacing: "1px",
};

export const ICON_STYLE_IN_FILES: CSSProperties = {
  width: "1.2rem",
  fill: "#999999",
};
