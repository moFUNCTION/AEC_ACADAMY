import { ImageUploader } from "../../@Firebase/Utils/Common/ImageUploader/ImageUploader";
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
  constructor(props) {
    Object.assign(this, props);
  }
  #getAllParams() {
    return { ...this };
  }
  async Add() {
    const { error, data } = await tryCatch(async () => {
      return await axiosInstance.post("/assignments/", this.#getAllParams());
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
      return await axiosInstance.put(
        `/assignments/${id}/`,
        this.#getAllParams()
      );
    });

    if (error) {
      return { error };
    }

    return { data };
  }

  static async AddQuestions({ id, questions = [] }) {
    const QuestionsSend = await Promise.all(
      questions.map(async (question) => {
        const DataSend = {
          question: question.question,
          assignment: id,
          answer: question.options.find((item) => {
            return item.key === question.correctAnswer;
          }).value,
          choices: question.options.map((option) => {
            return {
              title: option.value,
              is_correct: option.key === question.correctAnswer,
              attachments: [],
              ...option,
            };
          }),
          attachments: [],
        };
        if (question.attachment) {
          const [{ URL }] = await ImageUploader({
            path: "Questions-Attachments",
            files: [question.attachment],
          });
          DataSend.attachments = [
            {
              url: URL,
            },
          ];
        }
        return DataSend;
      })
    );
    console.log(QuestionsSend);
    const { error, data } = await tryCatch(async () => {
      return await axiosInstance.post("/bulk-questions/", {
        questions: QuestionsSend,
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

  static async Delete({ id }) {
    return tryCatch(async () => {
      return axiosInstance.delete(`/assignments/${id}/`);
    });
  }
}
