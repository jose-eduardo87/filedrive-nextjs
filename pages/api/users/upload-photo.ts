import nc from "next-connect";
import { utils } from "@/lib/index";
import errorHandler from "helpers/errorHandler";
import { useProtectAPI } from "@/hooks/index";
import { NextApiResponse } from "next";
import { RequestWithFile } from "pages/api/files/post-files";
import { ErrorType } from "helpers/Error";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req, _res, next) => useProtectAPI(req, next))
  .get(async (req, res) => {
    // endpoint responsible for creating and returning a signature on Cloudinary
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = await utils.api_sign_request(
      {
        timestamp,
        upload_preset: "ml_default",
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
