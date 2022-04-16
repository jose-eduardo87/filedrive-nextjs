import nc, { NextHandler } from "next-connect";
import prisma from "lib/prisma";
import useProtectAPI from "hooks/use-protect-api";
import errorHandler from "helpers/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import upload from "middlewares/upload";
import { ErrorType } from "helpers/Error";

interface Req extends Request {
  file: Express.MulterS3.File;
}

const handler = nc<Req, NextApiResponse>({
  onError: (err: ErrorType, req, res, next) => {
    return errorHandler(err, res);
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page not found");
  },
})
  .use((req, res, next) => useProtectAPI(req, next), upload.array("files"))
  .get((req, res) => {
    return res.status(200).json({ message: "Inside GET response." });
  })
  .post((req, res) => {
    res.status(200).json({ hello: "world" });
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
