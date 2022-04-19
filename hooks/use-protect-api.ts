import { getSession } from "next-auth/react";
import { NextHandler } from "next-connect";
import ErrorClass from "helpers/Error";
import { RequestWithFile } from "pages/api/files";

const useProtectAPI = async (req: RequestWithFile, next: NextHandler) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorClass("Unauthorized user. Are you logged in?", 401));
  }

  req.userID = session.user.id;

  next();
};

export default useProtectAPI;

// this hook acts as a middleware to check if the user is authenticated or not. It also adds the userID property into req so it can later be used on endpoint calls.
