import { getSession } from "next-auth/react";
import { IncomingMessage } from "http";
import { NextHandler } from "next-connect";
import ErrorClass from "helpers/Error";

const useProtectAPI = async (req: IncomingMessage, next: NextHandler) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorClass("Unauthorized user. Are you logged in?", 401));
  }

  next();
};

export default useProtectAPI;

// this hook acts as a middleware to check if user is authenticated or not.
