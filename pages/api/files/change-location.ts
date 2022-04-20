import nc from "next-connect";
import file from "models/File";
import errorHandler from "helpers/errorHandler";
import useProtectAPI from "hooks/use-protect-api";
import { NextApiResponse } from "next";
import ErrorClass, { ErrorType } from "helpers/Error";
import { RequestWithFile } from "./post-files";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req: RequestWithFile, _res, next) => useProtectAPI(req, next))
  .patch(async (req, res, next) => {
    // endpoint responsible for changing file's location from 'drive' to 'trash'.
    if (!req.body.location) {
      return next(
        new ErrorClass(
          "You have not provided a location to store the file.",
          400
        )
      );
    }

    const updatedFile = await file.update({
      where: {
        id: req.body.id,
      },
      data: {
        location: req.body.location.toUpperCase(),
      },
    });

    if (!updatedFile) {
      new ErrorClass(
        `There was an internal error moving the file to ${req.body.location.toLowerCase()}`,
        500
      );
    }

    return res.status(200).json({ success: true });
  });

export default handler;
