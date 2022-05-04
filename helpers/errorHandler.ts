// error handler to catch all the possible errors related to backend in the app.

import { NextApiResponse } from "next";
import type { ErrorType } from "./Error";

// send errors in development environment. In this case, all the possible details will be returned.
const sendErrorDev = (err: ErrorType, res: NextApiResponse) => {
  console.error(err);

  return res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// send errors in production environment.
const sendErrorProd = (err: ErrorType, res: NextApiResponse) => {
  // if error isOperational, send customized messages
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // if error has an unknown origin, send this generic response.
  return res.status(500).json({
    success: false,
    message: "Something went wrong. We apologize for any inconvenience.",
  });
};

const errorHandler = (err: ErrorType, res: NextApiResponse) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === "production") {
    // * ADD CONDITIONALS * //

    sendErrorProd(err, res);
  }
};

export default errorHandler;
