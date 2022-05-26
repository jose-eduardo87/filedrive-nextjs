import nc from "next-connect";
import cloudinary from "lib/cloudinary";
import errorHandler from "helpers/errorHandler";
import useProtectAPI from "hooks/use-protect-api";
import { NextApiResponse } from "next";
import { RequestWithFile } from "pages/api/files/post-files";
import { ErrorType } from "helpers/Error";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req, _res, next) => useProtectAPI(req, next))
  .get(async (req, res, next) => {
    // endpoint responsible for creating and returning a signature on Cloudinary
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = await cloudinary.utils.api_sign_request(
      {
        timestamp,
        eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
        folder: "profile_pics",
        public_id: req.userID,
      },
      process.env.CLOUDINARY_API_SECRET!
    );

    return res
      .status(200)
      .json({ success: true, publicId: req.userID, signature, timestamp });
  });

export default handler;
