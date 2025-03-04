import { ImageUploader } from "../../@Firebase/Utils/Common/ImageUploader/ImageUploader";
import { tryCatch } from "../../Utils/TryAndCatchHandler/TryAndCatchHandler";
import axiosInstance from "../../axiosConfig/axiosInstance";

export class Course {
  constructor({
    image,
    title,
    level,
    price,
    language,
    category,
    subCategory,
    description,
    AccessToken,
    userId,
  }) {
    this.image = image;
    this.title = title;
    this.level = level;
    this.price = price;
    this.language = language;
    this.category = category;
    this.subCategory = subCategory;
    this.description = description;
    this.AccessToken = AccessToken;
    this.userId = userId;
  }
  #getAllParams() {
    return { ...this };
  }
  async Add() {
    const [{ URL, filePath }] = await ImageUploader({
      path: "Courses",
      files: [this.image],
    });
    const { error, data } = await tryCatch(async () => {
      return await axiosInstance.post("/courses/", {
        ...this.#getAllParams(),
        image: URL,
        user: this.userId,
        sub_category: this.subCategory,
      });
    });
    if (error) {
      return {
        error,
      };
    }
    return {
      data,
    };
  }
  async Update(courseId) {
    let imageURL = this.image;

    if (this.image instanceof File) {
      const [{ URL }] = await ImageUploader({
        path: "Courses",
        files: [this.image],
      });
      imageURL = URL;
    }

    const updatedData = {
      ...this.#getAllParams(),
      image: imageURL,
    };

    const { error, data } = await tryCatch(async () => {
      return await axiosInstance.put(`/courses/${courseId}/`, updatedData, {});
    });

    if (error) {
      return { error };
    }

    return { data };
  }

  static async Delete({ id }) {
    return tryCatch(async () => {
      return axiosInstance.delete(`/courses/${id}/`);
    });
  }
}
