import { useEffect, useState } from "react";
import createFieldService from "../services/createField";
import { CreateFieldSchema } from "Field/schemas/createProductSchema";

const useCreateFieldService = (
  body: CreateFieldSchema | null,
  callback: (error?: string) => void
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (body !== null) {
      setLoading(true);
      createFieldService(body)
        .then(() => callback())
        .catch((error) => callback(error.message))
        .finally(() => setLoading(false));
    }
  }, [body, callback]);

  return {
    loading,
  };
};

export default useCreateFieldService;
