import nc from "next-connect";
import user from "models/User";
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
  .get(async (req, res, next) => {
    const loggedUser = await user.findUnique({
      where: {
        id: req.userID,
      },
    });

    if (!loggedUser) {
      return next(
        new ErrorClass("There is no user with the specified ID.", 500)
      );
    }

    return res.status(200).json({
      success: true,
      language: loggedUser.language === "en" ? "en" : "ptBR",
    });
  })
  .patch(async (req, res, next) => {
    const { language } = req.body;

    if (language === undefined) {
      return next(new ErrorClass("Missing property on request.", 500));
    }

    const updatedLanguage = await user.update({
      where: {
        id: req.userID,
      },
      data: {
        language: language.includes("-") ? language.replace("-", "") : language,
      },
    });

    if (!updatedLanguage) {
      return next(
        new ErrorClass("There was an error updating the language.", 500)
      );
    }

    return res.status(200).json({ success: true });
  });

export default handler;
