import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { RequestWithFile } from "pages/api/files/postFiles";

const S3Client = new AWS.S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

const upload = multer({
  storage: multerS3({
    s3: S3Client,
    bucket: process.env.AWS_BUCKET!,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req: RequestWithFile, file, cb) {
      const fileName = `${req.userID}/${file.originalname}`;

      cb(null, fileName);
    },
  }),
});

export default upload;
