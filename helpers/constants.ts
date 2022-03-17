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

export const HEADING_STYLE_IN_DASHBOARD: CSSProperties = {
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
