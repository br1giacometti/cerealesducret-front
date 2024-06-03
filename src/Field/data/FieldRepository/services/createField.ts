import { isAxiosError } from "axios";
import fieldClient from "../client";
import { CreateFieldSchema } from "Field/schemas/createProductSchema";

const createField = async (body: CreateFieldSchema) => {
  try {
    const response = await fieldClient.post("/create", body);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }
    throw new Error("Unknown error");
  }
};

export default createField;
