// error handler to catch all the possible errors related to backend in the app.

import { NextApiResponse } from "next";
import ErrorClass, { ErrorType } from "./Error";

// Error handlers

// The only 'unique' field that can be provided by users in the entire database is the 'e-mail' field, therefore this message as return.
const duplicateFieldError = () =>
  new ErrorClass("E-mail provided is already in use.", 400);

// send errors in development environment. In this case, all the possible details will be returned.
const sendErrorDev = (err: ErrorType, res: NextApiResponse) => {
  console.error("ERROR: ", err);

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
    let error = { ...err };

    // perform check to nail down the error type and provide more user-friendly messages to users.

    // CODE === 'P2002' => user provided some value marked as 'unique' that already exists in the database.
    if (error.code === "P2002") {
      error = duplicateFieldError();
    }

    sendErrorProd(error, res);
  }
};

export default errorHandler;
