import { CreateFieldSchema } from "Field/schemas/createFieldSchema";

export interface Field {
  description: string;
  hectares: number;
  id: number;
}

export interface FieldRepository {
  createField: (body: CreateFieldSchema) => Promise<Field>;
  getAllField: () => Promise<Field[]>;
}
