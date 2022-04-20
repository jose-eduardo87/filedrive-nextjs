import nc from "next-connect";
import file from "models/File";
import useProtectAPI from "hooks/use-protect-api";
import errorHandler from "helpers/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import upload from "middlewares/upload";
import ErrorClass, { ErrorType } from "helpers/Error";

export interface RequestWithFile extends NextApiRequest {
  files: Express.MulterS3.File[];
  userID: string;
}

const handler = nc<RequestWithFile, NextApiResponse>({
  onError: (err: ErrorType, _req, res) => errorHandler(err, res),
  onNoMatch: (_req, res) => res.status(404).end("Page not found."),
})
  .use(
    (req: RequestWithFile, _res, next) => useProtectAPI(req, next),
    upload.array("files")
  )
  .post(async (req, res, next) => {
    // endpoint responsible for creating a database whenever new file(s) is(are) added.
    const data = req.files.map((file) => {
      return {
        fileName: file.originalname,
        size: file.size,
        ownerId: req.userID,
        url: file.location,
      };
    });

    const uploadedFiles = await file.createMany({ data });

    if (!uploadedFiles) {
      return next(
        new ErrorClass("There was an error uploading the file.", 500)
      );
    }

    return res.status(201).json({ success: true });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

// AN EXPLANATION OF WHAT I CREATED TWO ROUTES FOR HANDLING PATCH AND POST REQUESTS:

// next-connect is a nice and straightforward way of using middlewares in API routes. It comes with chainable methods for every HTTP verb and of course, .use() for
// middleware needs. When implementing POST routes capable of receiving files, a couple of steps were needed. First thing to do is to disable body parser. In NextJS,
// every API route can export a config object that has bodyParser as an option. Setting it to false automatically would solve my problem. Next thing to do is to send
// the body in a FormData() instance. Again, easy peasy, as soon as the user hits the button Send to upload the file(s), everything is converted to a FormData instance
// before being sent via fetch(). The last piece of the puzzle is to not send any headers in fetch(). After a bit of refactoring in my HTTP requests hook, everything was
// working beautifully. However... (CONTINUAR)
