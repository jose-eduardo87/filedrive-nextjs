import { NextApiResponse } from "next";
import type { ErrorType } from "./Error";

const errorHandler = (err: ErrorType, res: NextApiResponse) => {
  const { statusCode, message, isOperational } = err;

  if (isOperational) {
    return res.status(statusCode).json({ success: false, message });
  }
};

export default errorHandler;

// error handler to catch all the possible errors in the app.
