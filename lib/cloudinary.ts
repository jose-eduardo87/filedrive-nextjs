import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.Tklh6ZyQVTmkLlTY1NB6bpuqYyQ,
  secure: true,
});

// decided not to export the whole 'cloudinary' object because of sensitive information, just exporting the
// only object needed outside this file - 'utils'(used in upload-photo.ts)
const { utils } = cloudinary;

export default utils;
