import nc from "next-connect";
import { file } from "@/models/index";
import { useProtectAPI } from "@/hooks/index";
import { NextApiResponse } from "next";
import { ErrorType } from "helpers/Error";
import errorHandler from "helpers/errorHandler";
import { RequestWithFile } from "./post-files";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req: RequestWithFile, _res, next) => useProtectAPI(req, next))
  .get(async (req, res, next) => {
    // endpoint responsible for returning the top-five biggest files in user's drive.
    const sortedFiles = await file.sortBySize(req.userID);

    return res.status(200).json({ success: true, sortedFiles });
  });

export default handler;
