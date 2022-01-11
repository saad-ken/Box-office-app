import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGET } from "../misc/config";

const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const OnSearch = () => {
    // https://api.tvmaze.com/search/shows?q=
    apiGET(
      `/search/shows?q=${input})`.then((result) => {
        setResults(result);
      })
    );
  };

  const onKeydown = (ev) => {
    if (ev.keyCode === 13) {
      OnSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return (
        <>
          {results.map((items) => (
            <div key={items.show.id}> {items.show.name} </div>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeydown}
      />
      <button type="button" onClick={OnSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
