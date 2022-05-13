import nc from "next-connect";
import user from "models/User";
import errorHandler from "helpers/errorHandler";
import { NextApiResponse } from "next";
import { RequestWithFile } from "pages/api/files/post-files";
import ErrorClass, { ErrorType } from "helpers/Error";

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
}).post(async (req, res, next) => {
  const { nameValue, emailValue, passwordValue, passwordConfirmValue } =
    req.body;

  const freshUser = await user.create({
    data: {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      passwordConfirm: passwordConfirmValue,
    },
  });

  if (!freshUser) {
    return next(
      new ErrorClass(
        "There was a problem creating your account. Please try again later.",
        500
      )
    );
  }

  return res.status(201).json({
    success: true,
    data: freshUser,
  });
});

export default handler;
