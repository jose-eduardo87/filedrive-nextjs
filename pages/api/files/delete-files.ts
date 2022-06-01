import nc from "next-connect";
import { S3Client } from "@/lib/index";
import { file } from "@/models/index";
import errorHandler from "helpers/errorHandler";
import { useProtectAPI } from "@/hooks/index";
import ErrorClass, { ErrorType } from "helpers/Error";
import { NextApiResponse } from "next";
import { RequestWithFile } from "./post-files";
import { RegisteredFilesInterface } from "hooks/use-checkbox";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req: RequestWithFile, _res, next) => useProtectAPI(req, next))
  .delete(async (req, res, next) => {
    const keysList = req.body.files.map((file: RegisteredFilesInterface) => ({
      Key: file.key,
    }));
    const idList = req.body.files.map(
      (file: RegisteredFilesInterface) => file.id
    );

    // delete file(s) on AWS S3
    const deletedFilesAWS = await S3Client.deleteObjects({
      Bucket: process.env.AWS_BUCKET!,
      Delete: { Objects: keysList },
    }).promise();

    if (deletedFilesAWS.Errors!.length === 0) {
      // delete file record(s) on database
      const deletedFilesDB = await file.deleteMany({
        where: {
          id: {
            in: idList,
          },
        },
      });

      if (!deletedFilesDB) {
        return next(
          new ErrorClass(
            "There was an internal error deleting the file(s).",
            500
          )
        );
      }
    }

    return res.status(200).json({ success: true });
  });

export default handler;
