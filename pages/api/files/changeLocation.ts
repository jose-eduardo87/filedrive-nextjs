import nc from "next-connect";
import file from "models/File";
import errorHandler from "helpers/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import ErrorClass, { ErrorType } from "helpers/Error";

// SHOULD I USE 'next-connect' OR JUST A NORMAL HANDLER FUNCTION? I MAY BE USING IT OVER PLAIN HANDLER BECAUSE OF THE errorHandler().

export interface RequestWithFile extends NextApiRequest {
  files: Express.MulterS3.File[];
  userID: string;
}

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  //   .use() ===> no middlewares for now
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
