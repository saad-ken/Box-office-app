import React, { useEffect, useReducer } from "react";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGET } from "../misc/config";
import { useShows } from "../misc/custom-hooks";

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

const Starred = () => {
  const [starred] = useShows();
  const [{ isLoading, error, show }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGET(`/shows/${showId}`));
      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          dispatch({ type: "FETCH_SUCCESS", show: results });
        })
        .catch((err) => {
          dispatch({ type: "FETCH_UNSUCCESS", error: err.message });
        });
      // /shows/${id}
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured : {error}</div>}
      {!isLoading && !show && <div>No shows were added</div>}
      {!isLoading && !error && show && <ShowGrid data={show} />}
    </MainPageLayout>
  );
};

export default Starred;
