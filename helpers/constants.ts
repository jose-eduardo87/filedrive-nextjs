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

export const DEFAULT_AVATAR = "/images/default-avatar.webp";

export const HEADING_STYLE_IN_DASHBOARD: CSSProperties = {
  fontWeight: 100,
  marginBottom: "3rem",
  color: "#2093C3",
};

export const PANEL_STYLES: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "transparent",
};

export const HEADING_STYLE_IN_DRIVE_BIN: CSSProperties = {
  color: "#7E7E7E",
  fontSize: "1.2rem",
  fontWeight: 400,
  letterSpacing: "1px",
};

export const ICON_STYLE_IN_DRIVE_BIN: CSSProperties = {
  width: "1.2rem",
  fill: "#999999",
};

export const VIDEO_EXTENSION = [
  "webm",
  "mkv",
  "flv",
  "vob",
  "ogv",
  "ogg",
  "drc",
  "gif",
  "gifv",
  "mng",
  "avi",
  "mts",
  "m2ts",
  "ts",
  "mov",
  "qt",
  "wmv",
  "yuv",
  "rm",
  "rmvb",
  "viv",
  "asf",
  "amv",
  "mp4",
  "m4p",
  "m4v",
  "mpg",
  "mp2",
  "mpeg",
  "mpe",
  "mpv",
  "m2v",
  "m4v",
  "svi",
  "3gp",
  "3g2",
  "mxf",
  "roq",
  "nsv",
  "f4v",
  "f4p",
  "f4a",
  "f4b",
];

export const IMAGE_EXTENSION = [
  "jpg",
  "jpeg",
  "jpe",
  "jif",
  "jfif",
  "jfi",
  "png",
  "webp",
  "tiff",
  "tif",
  "psd",
  "raw",
  "arw",
  "cr2",
  "nrw",
  "k25",
  "bmp",
  "dib",
  "heif",
  "heic",
  "indd",
  "ind",
  "indt",
  "jp2",
  "j2k",
  "jpf",
  "jpx",
  "jpm",
  "mj2",
  "svg",
  "svgz",
  "ai",
  "eps",
];

export const DOCUMENT_EXTENSION = [
  "doc",
  "docx",
  "htm",
  "html",
  "odt",
  "pdf",
  "xls",
  "xlsx",
  "ods",
  "ppt",
  "pptx",
  "txt",
];

export const MODAL_STYLES: CSSProperties = {
  width: "16rem",
  position: "fixed",
  top: "10%",
  left: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const SELECTOR_STYLES = {
  height: 30,
  width: 66,
  handleDiameter: 20,
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
  activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
  onHandleColor: "#2693E6",
  onColor: "#E7FFFF",
  offColor: "#FDE4E8",
};

export const ICONS_STYLES_SETTINGS_OPTIONS = {
  fontSize: ".8rem",
  fontWeight: 600,
};
