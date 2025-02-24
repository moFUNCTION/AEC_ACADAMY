import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../Config";
import { v4 } from "uuid";
export const ImageUploader = async ({ path, files }) => {
  try {
    const imageUploading = files.map(async (file) => {
      const dataUrlRegex =
        /^data:([a-zA-Z0-9+\/-]+\/[a-zA-Z0-9+\/-]+)?(;[a-zA-Z-]+=[a-zA-Z0-9-]+)*(;base64)?,[a-zA-Z0-9+/=]*$/;
      if (
        file instanceof File ||
        file instanceof Blob ||
        dataUrlRegex.test(file)
      ) {
        const filePath = `${path}/${(file.name || "DATA_URL") + v4()}`;
        const fileRef = ref(storage, filePath);
        await uploadBytes(fileRef, file);
        const URL = await getDownloadURL(fileRef);
        return {
          URL,
          filePath,
        };
      } else {
        return {
          URL: file,
        };
      }
    });
    return await Promise.all(imageUploading);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
