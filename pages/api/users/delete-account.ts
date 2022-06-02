import nc from "next-connect";
import { user } from "@/models/index";
import errorHandler from "helpers/errorHandler";
import { useProtectAPI } from "@/hooks/index";
import { NextApiResponse } from "next";
import { RequestWithFile } from "pages/api/files/post-files";
import ErrorClass, { ErrorType } from "helpers/Error";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req, _res, next) => useProtectAPI(req, next))
  .delete(async (req, res, next) => {});

export default handler;
