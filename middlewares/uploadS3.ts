import multer from "multer";
import multerS3 from "multer-s3";
import S3Client from "lib/S3Client";
import { RequestWithFile } from "pages/api/files/post-files";

const uploadS3 = multer({
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

export default uploadS3;
