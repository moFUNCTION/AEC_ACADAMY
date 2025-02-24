import { ImageUploader } from "../@Firebase/Utils/Common/ImageUploader/ImageUploader";
import { tryCatch } from "../Utils/TryAndCatchHandler/TryAndCatchHandler";
import { Student } from "./Student";
import axiosInstance from "../axiosConfig/axiosInstance";

export class Instructor extends Student {
  static async CreateApplication({
    UserId,
    first_name,
    middle_name,
    last_name,
    age,
    nationality,
    phone,
    email,
    degree,
    place,
    sex,
    category,
    subCategory,
    certificate,
    cv,
    image,
    AccessToken,
  }) {
    const ApplicationData = {
      user: UserId,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      age: age,
      nationality: nationality,
      phone_number: phone,
      email: email,
      university_degree: degree,
      place: place,
      gender: sex,
      marital_status: "Maried",
      status: "in review",
      category: category,
      sub_category: subCategory,
    };
    if (cv) {
      const [{ URL: CvURL, filePath: CvPath }] = await ImageUploader({
        path: "AEC_ACADAMY",
        files: [cv[0]],
      });
      ApplicationData.cv = CvURL;
    }

    if (certificate) {
      const [{ URL: CertificateURL, filePath: CertificatePath }] =
        await ImageUploader({
          path: "AEC_ACADAMY",
          files: [certificate[0]],
        });
      ApplicationData.certificate = CertificateURL;
    }

    if (image) {
      const [{ URL: UserImage, filePath: UserImagePath }] = await ImageUploader(
        {
          path: "AEC_ACADAMY",
          files: [image],
        }
      );
      ApplicationData.photos = [UserImage];
    }

    const Request = await tryCatch(async () => {
      return await axiosInstance.post(
        "/instractor-application/",
        ApplicationData,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      );
    });
    return {
      ...Request,
      ApplicationData,
    };
  }
  static async CreateInstructorAccount(
    {
      email,
      first_name,
      middle_name,
      last_name,
      sex,
      password,
      category,
      phone,
      age,
      nationality,
      degree,
      place,
      subCategory,
      certificate,
      cv,
      image,
    },
    { errors: { errorHandler } },
    { isSignedIn, onAuth }
  ) {
    console.log(isSignedIn);
    if (!isSignedIn) {
      const { data, error } = await this.createAccount({
        email,
        name: `${first_name} ${middle_name} ${last_name}`,
        sex,
        password,
        category,
        phone,
      });
      if (error) {
        errorHandler({ error, origin: "Register Request" });
        return {
          error: error,
        };
      }
    }
    const { data: LoginData, error: LoginError } = await this.Login({
      email,
      password,
    });
    onAuth(
      {
        email,
        first_name,
        middle_name,
        last_name,
        sex,
        password,
        category,
        phone,
        age,
        nationality,
        degree,
        place,
        subCategory,
        image,
      },
      "Instructor"
    );

    if (LoginError) {
      errorHandler({ error: LoginError, origin: "Login Request" });
      return {
        error: LoginError,
      };
    }
    const { data: ApplicationResponce, error: ApplicationError } =
      await this.CreateApplication({
        UserId: LoginData.data.id,
        first_name,
        last_name,
        middle_name,
        age,
        nationality,
        phone,
        email,
        degree,
        place,
        sex,
        category,
        subCategory,
        certificate,
        cv,
        image,
        AccessToken: LoginData.data.access,
      });

    if (ApplicationError) {
      errorHandler({
        error: ApplicationError,
        origin: "Create Application Request",
      });
      return {
        error: ApplicationError,
      };
    }

    onAuth(
      {
        ...ApplicationResponce.data,
        email,
        password,
        isApplicationSend: true,
        photos: [ApplicationResponce.image],
      },
      "Instructor"
    );

    return {
      ApplicationResponce,
      LoginData,
    };
  }
}
