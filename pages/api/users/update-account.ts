import nc from "next-connect";
import user from "models/User";
import errorHandler from "helpers/errorHandler";
import useProtectAPI from "hooks/use-protect-api";
import { NextApiResponse } from "next";
import { RequestWithFile } from "pages/api/files/post-files";
import ErrorClass, { ErrorType } from "helpers/Error";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use((req, _res, next) => useProtectAPI(req, next))
  .patch(async (req, res, next) => {
    const updateBody: {
      name?: string;
      password?: string;
      passwordConfirm?: string;
    } = Object.fromEntries(
      Object.entries(req.body).filter(([_, value]) => value !== "")
    );

    const updateKeys = Object.keys(updateBody);

    if (updateKeys.length === 1 && updateKeys.includes("name")) {
      //   // user is updating name
      const updatedUser = await user.update({
        where: {
          id: req.userID,
        },
        data: {
          name: updateBody.name,
        },
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
    }
    if (updateKeys.includes("password" && "passwordConfirm")) {
      //   // user is updating password
      //   // IMPLEMENT IT WHEN USER SIGN IN IS DONE
    }
  })
  .post(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;

    return res.status(200).json({ name, email, password, passwordConfirm });
  });

export default handler;
