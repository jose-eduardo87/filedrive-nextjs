import nc from "next-connect";
import prisma from "lib/prisma";
import useProtectAPI from "hooks/use-protect-api";
import errorHandler from "helpers/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import upload from "middlewares/upload";
import ErrorClass, { ErrorType } from "helpers/Error";

export interface RequestWithFile extends NextApiRequest {
  files: Express.MulterS3.File[];
  userID: string;
}

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found"),
})
  .use(
    (req: RequestWithFile, _res, next) => useProtectAPI(req, next),
    upload.array("files")
  )
  .post(async (req, res, next) => {
    const files = req.files.map((file) => {
      return {
        fileName: file.originalname,
        size: file.size,
        ownerId: req.userID,
        url: file.location,
      };
    });

    const uploadedFiles = await prisma.file.createMany({
      data: files,
    });

    if (!uploadedFiles) {
      return next(
        new ErrorClass("There was an error updating the database.", 500)
      );
    }

    return res.status(200).json({ success: true });
  })
  .patch(async (req, res) => {
    // CHANGING FILE'S LOCATION FROM BIN TO TRASH AND VICE-VERSA LOGIC GOES HERE
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
