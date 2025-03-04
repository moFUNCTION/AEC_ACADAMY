import { tryCatch } from "../../Utils/TryAndCatchHandler/TryAndCatchHandler";
import axiosInstance from "../../axiosConfig/axiosInstance";

export class Category {
  constructor({ title }) {
    this.title = title;
  }
  async Add() {
    const { error, data } = await tryCatch(async () => {
      return await axiosInstance.post("/categories/", {
        title: this.title,
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
      return await axiosInstance.put(`/categories/${id}/`, {
        title: this.title,
      });
    });

    if (error) {
      return { error };
    }

    return { data };
  }

  static async Delete({ id }) {
    return tryCatch(async () => {
      return axiosInstance.delete(`/categories/${id}/`);
    });
  }
}

export class SubCategory {
  constructor({ title }) {
    this.title = title;
  }
  async Add() {
    const { error, data } = await tryCatch(async () => {
      return await axiosInstance.post("/sub-categories/", {
        title: this.title,
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
      return await axiosInstance.put(`/sub-categories/${id}/`, {
        title: this.title,
      });
    });

    if (error) {
      return { error };
    }

    return { data };
  }

  static async Delete({ id }) {
    return tryCatch(async () => {
      return axiosInstance.delete(`/sub-categories/${id}/`);
    });
  }
}
