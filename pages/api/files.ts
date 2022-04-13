import nc, { NextHandler } from "next-connect";
import prisma from "lib/prisma";
import useProtectAPI from "hooks/useProtectAPI";
import errorHandler from "helpers/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import upload from "middlewares/fileUpload";
import { ErrorType } from "helpers/Error";

const handler = nc({
  onError: (
    err: ErrorType,
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    return errorHandler(err, res);
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use((req, res, next) => useProtectAPI(req, next), upload.single("file"))
  .get((req, res, next) => {
    return res.status(200).json({ message: "Inside GET response." });
  })
  .post((req, res) => {
    console.log("REQ", req.body);

    res.json({ hello: "world" });
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
