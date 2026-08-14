import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;