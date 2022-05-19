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
  .patch(async (req, res, next) => {
    // currently it only updates user name, but it can later be used to any other type of user update.
    const { name } = req.body;

    const updatedUser = await user.update({
      where: {
        id: req.userID,
      },
      data: {
        name,
      },
    });

    if (!updatedUser) {
      return next(
        new ErrorClass(
          "There was an internal error uploading information.",
          500
        )
      );
    }

    return res.status(200).json({ success: true });
  });

export default handler;
