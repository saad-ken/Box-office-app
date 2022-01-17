import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGET } from "../misc/config";

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }

    case "FETCH_UNSUCCESS": {
      return { ...prevState, isLoading: false, error: action.error };
    }

    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGET(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: results });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_UNSUCCESS", error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log("this is show : ", show);
  if (isLoading) {
    return <div>Data is loading</div>;
  }
  if (error) {
    return <div>Opps Error occured: {error}</div>;
  }

  return <div>this is show page</div>;
};

export default Show;
