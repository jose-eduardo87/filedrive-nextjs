import nc from "next-connect";
import user from "models/User";
import errorHandler from "helpers/errorHandler";
import useProtectAPI from "hooks/use-protect-api";
import { NextApiResponse } from "next";
import { RequestWithFile } from "pages/api/files/post-files";
import ErrorClass, { ErrorType } from "helpers/Error";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req, _res, next) => useProtectAPI(req, next))
  .get(async (req, res, next) => {
    const loggedUser = await user.findUnique({
      where: {
        id: req.userID,
      },
    });

    if (!loggedUser) {
      return next(
        new ErrorClass("There is no user with the specified ID.", 500)
      );
    }

    return res.status(200).json({
      success: true,
      theme: loggedUser.theme,
    });
  })
  .patch(async (req, res, next) => {
    const { isDark } = req.body;

    if (isDark === undefined) {
      return next(new ErrorClass("Missing property on request.", 500));
    }

    const theme = isDark ? "DARK" : "CLEAR";

    const updatedTheme = await user.update({
      where: {
        id: req.userID,
      },
      data: {
        theme,
      },
    });

    if (!updatedTheme) {
      return next(
        new ErrorClass("There was an error updating the theme.", 500)
      );
    }

    return res.status(200).json({ success: true });
  });

export default handler;
