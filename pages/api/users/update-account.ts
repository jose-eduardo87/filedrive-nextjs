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
  .patch(async (req, res, next) => {
    // endpoint responsible for updating user name and profile image. The profile image is a URL from either Cloudinary or Google

    const allowedFields = ["name", "image"];
    const fieldComingFromBody = Object.keys(req.body);
    const hasForbiddenFields =
      fieldComingFromBody.filter((field) => !allowedFields.includes(field))
        .length > 0;

    if (hasForbiddenFields) {
      return next(
        new ErrorClass(
          "There were forbidden fields to update. Please make sure that you are uploading your name and profile image only.",
          403
        )
      );
    }

    const updatedUser = await user.update({
      where: {
        id: req.userID,
      },
      data: req.body,
    });

    if (!updatedUser) {
      return next(
        new ErrorClass(
          "There was an internal error uploading information.",
          500
        )
      );
    }

    return res.status(200).json({ success: true });
  });

export default handler;
