import { S3 } from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { RequestWithFile } from "pages/api/files/post-files";

// main object. Because it carries sensitive information, this object is kept local. Only the below methods are available globally
const S3Client = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

// used in post-files.ts to manipulate files before they are uploaded
export const uploadS3 = multer({
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

// deletes file(s) from S3 with the key(s) array
export const deleteUserFiles = async (keysList: [{ Key: string }]) => {
  const deletedFilesAWS = await S3Client.deleteObjects({
    Bucket: process.env.AWS_BUCKET!,
    Delete: { Objects: keysList },
  }).promise();

  if (deletedFilesAWS.Errors!.length === 0) {
    return;
  }
};

// deletes user folder when users cancel account
export const deleteUserFolder = async (directory: string) => {
  const listParams = {
    Bucket: process.env.AWS_BUCKET!,
    Prefix: directory,
  };
  const listedObjects = await S3Client.listObjectsV2(listParams).promise();

  if (listedObjects.Contents!.length === 0) {
    return;
  }

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET!,
    Delete: {
      Objects: listedObjects.Contents!.map(({ Key }) => Key),
    },
  };

  // deleteParams.Delete.Objects = listedObjects.Contents!.map(({ Key }) => Key);

  await S3Client.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) {
    await deleteUserFolder(directory);
  }
};

export default S3Client;
