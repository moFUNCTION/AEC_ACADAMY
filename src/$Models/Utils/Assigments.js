import { tryCatch } from "../../Utils/TryAndCatchHandler/TryAndCatchHandler";
import axiosInstance from "../../axiosConfig/axiosInstance";

class AssigmentType {
  constructor({ name }) {
    this.name = name;
  }
  async Add() {
    const { error, data } = await tryCatch(async () => {
      return await axiosInstance.post("/assignment-types/", {
        name: this.name,
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
  async Update(id) {
    const { error, data } = await tryCatch(async () => {
      return await axiosInstance.put(`/assignment-types/${id}/`, {
        name: this.name,
      });
    });

    if (error) {
      return { error };
    }

    return { data };
  }

  static async Delete({ id }) {
    return tryCatch(async () => {
      return axiosInstance.delete(`/assignment-types/${id}/`);
    });
  }
}

export class Assigment {
  static Type = AssigmentType;
}
