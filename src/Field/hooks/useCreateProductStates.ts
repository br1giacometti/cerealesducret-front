import { useReducer } from "react";

import { Product } from "Field/data/FieldRepository";
import FetchActionTypes from "Base/types/FetchActionTypes";
import createProductReducer from "Field/data/FieldRepository/reducer/createProductReducer";
import { initialState } from "Field/data/FieldRepository/reducer/listFieldReducer";

const useCreateProductStates = () => {
  const [{ loading, error }, dispatch] = useReducer(
    createProductReducer,
    initialState
  );

  const startFetch = () => dispatch({ type: FetchActionTypes.Start });

  const successFetch = (payload: Product) =>
    dispatch({ type: FetchActionTypes.Succeess, payload });

  const failureFetch = (errorMessage: string) =>
    dispatch({
      type: FetchActionTypes.Failure,
      payload: errorMessage,
    });

  return { loading, error, startFetch, successFetch, failureFetch };
};

export default useCreateProductStates;
