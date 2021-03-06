import { CSSProperties } from "react";

// =========== constants used in FileUploader.tsx for styling drag and drop components ===========

export const acceptStyle: CSSProperties = {
  borderColor: "#00e676",
};

export const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderStyle: "dashed",
  color: "#BDBDBD",
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
};

export const focusedStyle: CSSProperties = {
  borderColor: "#2196f3",
};

export const rejectStyle: CSSProperties = {
  borderColor: "#ff1744",
};

// ===============================================================================================

export const DEFAULT_AVATAR = "/images/default-avatar.webp"; // used in userinfo-context.tsx for giving profileImage a default image

export const HEADING_STYLE_IN_DRIVE_BIN: CSSProperties = {
  // used in Bin.tsx and Drive.tsx for styling heading
  color: "#7E7E7E",
  fontSize: "1.2rem",
  fontWeight: 400,
  letterSpacing: "1px",
};

export const ICON_STYLE_IN_DRIVE_BIN: CSSProperties = {
  // used in Bin.tsx and Drive.tsx for styling icons
  width: "1.2rem",
  fill: "#999999",
};

export const ICONS_STYLES_SETTINGS_OPTIONS = {
  // used in Selector.tsx for styling theme switch
  fontSize: ".8rem",
  fontWeight: 600,
  color: "#000000",
};

export const MODAL_STYLES: CSSProperties = {
  // used n PopupMessage.tsx for styling popup modal
  width: "16rem",
  position: "fixed",
  top: "10%",
  left: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const PANEL_STYLES_IN_DRIVE_BIN: CSSProperties = {
  // used in Bin.tsx and Drive.tsx for styling empty panel
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundColor: "transparent",
};

export const SELECTOR_STYLES = {
  // spread out in Selector component inside of PreferenceSettings.tsx
  height: 30,
  width: 66,
  handleDiameter: 20,
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
  activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
  onHandleColor: "#2693E6",
  onColor: "#E7FFFF",
  offColor: "#FDE4E8",
};

// =========== used in functions.ts to return document, image or video icon ===========

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

// =================================================================

export const BAR_COLORS = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",
]; // used in FileChart.tsx and StorageChart.tsx for providing bar colors to charts
