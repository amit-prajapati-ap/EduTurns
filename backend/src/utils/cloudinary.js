import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) {
//             return null
//         }
//         const response = await cloudinary.uploader
//             .upload(localFilePath, {
//                 resource_type: 'auto'
//             })

//         fs.unlinkSync(localFilePath)
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath)
//         return null
//     }
// }

const deleteImageByUrl = async (imageUrl) => {
    const parts = imageUrl.split('/')
    const fileWithExtension = parts[parts.length - 1]
    const publicId = fileWithExtension.split('.')[0]

    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        console.log("Error while deleting the image from cloudinary: ", error)
        return null
    }
}

export { uploadOnCloudinary, deleteImageByUrl }