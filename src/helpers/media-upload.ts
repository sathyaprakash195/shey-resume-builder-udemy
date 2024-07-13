import firebaseAppConfig from "@/config/firebase";
import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";

export const uploadFileToFirebaseAndReturnUrl = async (file: any) => {
  try {
    const storageRef = getStorage(firebaseAppConfig);
    const fileRef = ref(storageRef, file.name);
    const uploadedFileResponse = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(uploadedFileResponse.ref);
    return url;
  } catch (error) {
    throw error;
  }
};
