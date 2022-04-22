import nc from "next-connect";
import S3Client from "lib/S3Client";
import file from "models/File";
import errorHandler from "helpers/errorHandler";
import useProtectAPI from "hooks/use-protect-api";
import { NextApiResponse } from "next";
import ErrorClass, { ErrorType } from "helpers/Error";
import { RequestWithFile } from "./post-files";

// {
//   Bucket: "BUCKET_NAME",
//   Delete: {
//     Objects: [
//       {
//         Key: "KEY_1",
//       },
//       {
//         Key: "KEY_2",
//       },
//     ],
//   },
// };

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req: RequestWithFile, _res, next) => useProtectAPI(req, next))
  .delete(async (req, res, next) => {
    console.log(req.body);

    return res.status(200).json({ success: true });
  });

export default handler;
